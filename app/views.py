from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.http import HttpResponse
from django.conf import settings
from django.contrib import messages

# Create your views here.
def index(request):
    if request.method == "POST":
        name = request.POST['name']
        email = request.POST['email']
        subject = request.POST['subject']
        message = request.POST['message']
        full_message = f"Name : {name}\nEmail : {email}\n\nMessage :\n{message}"
        from_email = settings.EMAIL_HOST_USER  # Change to your email
        to_email = settings.CONTACT_RECEIVER_EMAIL
        try:
            send_mail(subject, full_message, from_email, [to_email])
            messages.success(request, "✅ Email sent successfully!")  # Success message
            return redirect('index')  # Redirect to prevent resubmission
        except Exception as e:
            messages.error(request, f"❌ Failed to send email: {e}")  # Error message
            return redirect('index')  # Redirect even on failure to avoid stuck page
    return render(request, 'app/index.html')