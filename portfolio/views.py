from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    """Main portfolio page view"""
    context = {
        'title': 'MUSYOKI MUTUA | Software Engineer',
        'description': 'Innovative Software Engineer specializing in AI-powered healthcare solutions',
    }
    return render(request, 'portfolio/index.html', context)

@csrf_exempt
def contact_form(request):
    """Handle contact form submissions"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            email = data.get('email', '')
            message = data.get('message', '')
            
            # Here you would typically save to database or send email
            # For now, we'll just return a success response
            
            return JsonResponse({
                'status': 'success',
                'message': 'Thank you for your message! I will get back to you soon.'
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': 'There was an error sending your message. Please try again.'
            })
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
