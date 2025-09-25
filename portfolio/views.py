from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.conf import settings
from django.utils import timezone
import json
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

def index(request):
    """Main portfolio page view"""
    context = {
        'title': 'MUSYOKI MUTUA | Software Engineer',
        'description': 'Innovative Software Engineer specializing in AI-powered healthcare solutions',
    }
    return render(request, 'portfolio/index.html', context)

def contact_form(request):
    """Handle contact form submissions via Brevo email"""
    if request.method == 'POST':
        # Get form data from POST request
        name = request.POST.get('name')
        email = request.POST.get('email')
        role = request.POST.get('role')
        message = request.POST.get('message')
        
        # Validate required fields
        if not all([name, email, role, message]):
            messages.error(request, '❌ All fields are required.')
            return redirect('portfolio:index')
        
        # Configure Brevo API
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = settings.BREVO_API_KEY
        
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
        
        # Create email content
        subject = f"New Job Opportunity Inquiry - {role.replace('-', ' ').title()}"
        
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #10b981, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }}
                .footer {{ background: #374151; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #4b5563; }}
                .value {{ background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #10b981; }}
                .role-badge {{ 
                    display: inline-block; 
                    background: #10b981; 
                    color: white; 
                    padding: 5px 15px; 
                    border-radius: 20px; 
                    font-size: 12px; 
                    font-weight: bold; 
                    text-transform: uppercase; 
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin: 0;">🚀 New Job Opportunity Inquiry</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Portfolio Contact Form</p>
                </div>
                
                <div class="content">
                    <div class="field">
                        <div class="label">👤 Name:</div>
                        <div class="value">{name}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email:</div>
                        <div class="value">{email}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💼 Position Type:</div>
                        <div class="value">
                            <span class="role-badge">{role.replace('-', ' ').title()}</span>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Message:</div>
                        <div class="value" style="white-space: pre-wrap;">{message}</div>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <strong>📅 Received:</strong> {request.META.get('HTTP_HOST', 'Portfolio Website')}<br>
                        <strong>🌐 IP Address:</strong> {request.META.get('REMOTE_ADDR', 'Unknown')}<br>
                        <strong>🕒 Timestamp:</strong> {timezone.now().strftime('%Y-%m-%d %H:%M:%S UTC')}
                    </div>
                </div>
                
                <div class="footer">
                    <p style="margin: 0;">This email was sent from your portfolio contact form</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">
                        Reply directly to this email to respond to {name}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create email object
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": settings.BREVO_RECIPIENT_EMAIL, "name": "Vincent Musyoki"}],
            reply_to={"email": email, "name": name},
            html_content=html_content,
            sender={"name": "Portfolio Contact Form", "email": settings.BREVO_SENDER_EMAIL},
            subject=subject
        )
        
        try:
            # Send email
            api_response = api_instance.send_transac_email(send_smtp_email)
            messages.success(request, '✅ Thank you! Your message has been sent successfully. I\'ll get back to you within 24-48 hours.')
            
            # Send confirmation email to the sender
            send_confirmation_email(api_instance, name, email, role)
            
        except ApiException as e:
            print(f"Exception when calling TransactionalEmailsApi->send_transac_email: {e}")
            messages.error(request, '❌ Sorry, there was an error sending your message. Please try again or contact me directly.')
        
        return redirect('portfolio:index')
    
    return redirect('portfolio:index')

def send_confirmation_email(api_instance, name, email, role):
    """Send confirmation email to the person who submitted the form"""
    try:
        confirmation_html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #10b981, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }}
                .content {{ background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }}
                .footer {{ background: #374151; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; }}
                .button {{ 
                    display: inline-block; 
                    background: linear-gradient(135deg, #10b981, #06b6d4); 
                    color: white; 
                    padding: 12px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    font-weight: bold;
                    margin: 20px 0;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin: 0;">🎉 Message Received!</h2>
                    <p style="margin: 10px 0 0 0;">Thank you for reaching out</p>
                </div>
                
                <div class="content">
                    <p>Hi <strong>{name}</strong>,</p>
                    
                    <p>Thank you for your interest in the <strong>{role.replace('-', ' ').title()}</strong> opportunity! I've received your message and appreciate you taking the time to reach out.</p>
                    
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        <li>✅ I'll review your message within 24-48 hours</li>
                        <li>📧 I'll respond directly to this email address</li>
                        <li>🤝 If it's a good fit, we'll schedule a conversation</li>
                    </ul>
                    
                    <p>In the meantime, feel free to:</p>
                    <ul>
                        <li>🔍 Check out my projects on <a href="https://github.com/vinmutua" style="color: #10b981;">GitHub</a></li>
                        <li>💼 Connect with me on <a href="https://linkedin.com/in/vincent-musyoki-9aa088243" style="color: #10b981;">LinkedIn</a></li>
                        <li>📱 Contact me directly at <a href="tel:+254113021960" style="color: #10b981;">+254 11 302 1960</a></li>
                    </ul>
                    
                    <div style="text-align: center;">
                        <a href="https://portfolio-amdj.onrender.com" class="button">View My Portfolio</a>
                    </div>
                    
                    <p>Looking forward to discussing this opportunity with you!</p>
                    
                    <p>Best regards,<br>
                    <strong>Vincent Musyoki Mutua</strong><br>
                    <em>Software Engineer</em></p>
                </div>
                
                <div class="footer">
                    <p style="margin: 0; font-size: 14px;">This is an automated confirmation email</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">
                        If you didn't send this message, please ignore this email
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        confirmation_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": email, "name": name}],
            html_content=confirmation_html,
            sender={"name": "Vincent Musyoki", "email": settings.BREVO_SENDER_EMAIL},
            subject="✅ Message Received - I'll be in touch soon!"
        )
        
        api_instance.send_transac_email(confirmation_email)
        
    except ApiException as e:
        print(f"Exception when sending confirmation email: {e}")
