import hmac
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import *
import datetime
from .models import *
from .form import *
from random import randint
from django.contrib.auth.views import *
from django.contrib.admin.models import *
from django.db.models import Count
from django.http import *
import requests
from django.contrib import messages


def home(request):
    # LogEntry.objects.all().delete()
    # Project.objects.create(
    #     name="",
    #     description="",
    #     client=Client.objects.create(name=""),
    #     year=2008,
    #     sector="",  # Construction Landscape Repair
    #     location="",
    # )
    context = {
        'page': "home",
        'items': Project.objects.filter(isHome=True),
        'nav': True,
        'footer': True,
    }
    return render(request, "home.html", context)


def about(request):
    # LogEntry.objects.all().delete()
    context = {
        'page': "about",
        'nav': True,
        'footer': True,
    }
    return render(request, "about.html", context)


def contact(request):
    # LogEntry.objects.all().delete()
    context = {
        'page': "contact",
        'nav': True,
        'footer': True,
    }
    return render(request, "contact.html", context)


def projects(request):
    # LogEntry.objects.all().delete()
    context = {
        'page': "Projects",
        'projects': [],
        'nav': True,
        'footer': True,
    }
    for i in Project.objects.all():
        obj = {
            'id': i.project_id,
            'name': i.name,
            'type': i.sector,
            'year': i.year,
            'desc': i.shortDesc,
        }
        try:
            obj['img'] = str(i.images.get(thumbnail=True).url)
        except:
            obj['img'] = "NoImageSelected/"
        context['projects'].append(obj)

    return render(request, "projects.html", context)


def project_view(request, id):
    # LogEntry.objects.all().delete()
    context = {
        'page': "Project View",
        'nav': True,
        'footer': True,
    }
    if Project.objects.get(project_id=id):
        context['project'] = Project.objects.get(project_id=id)
    return render(request, "project_view.html", context)


name = ""
email = ""
phone = ""
description = ""


def sendEmail(request):
    if request.method == "POST":
        global name, email, phone, description
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        description = request.POST.get('outline_desc')
        subject = 'Client Wants To Contact You From Your Website'
        body = f'Someone Filled the Form and needs to Contact You:\nHis name is: {name}\nHis email is: {email}\n' + \
               f'His Phone is: {phone}\n' + f'His Description is: {description}'
        sender_email = str(settings.EMAIL_HOST_USER)
        recipient_email = "info@elnahass-sonsgroup.com"  # Email For the Company

        subject2 = 'Elnahass Sons Group For Construction Interested in Your Project'
        body2 = f"Dear {name},\n\n" \
                "I hope this message finds you well.\nWe would like to express our sincere appreciation for your " \
                "interest in our company, Elnahass Sons Group For Construction. Your project has captured" \
                " our attention, and we are " \
                "eager to learn more about it.\nOur team is committed to delivering high-quality solutions and " \
                "services to our clients. We believe that your project aligns with our expertise and values, " \
                "and we are excited about the opportunity to collaborate with you.\n\nA representative from Elnahass " \
                "Sons Group will be reaching out to you very soon to discuss your project in detail. We are " \
                "confident that our partnership will lead to success and innovation.\nIn the meantime, if you have " \
                "any immediate questions or would like to provide additional " \
                f"information about your project, please do not hesitate to contact us at {recipient_email}.\n" \
                "Thank you once again for considering Elnahass Sons Group as your trusted partner." \
                " We look forward to the opportunity to work with you and bring your vision to life.\n\n" \
                "Best regards,\n" \
                "From: Eng Alaa Elnahass\n" \
                "Co-Founder For: " \
                "Elnahass Sons Group For Construction\n" \
                f"{recipient_email}"

        recipient_email2 = email
        if name and email and phone and description:
            if Customer.objects.filter(name=name, email=email, phone=phone, outline_Desc=description).count() == 1:
                pass
            else:
                Customer.objects.create(name=name, email=email, phone=phone, outline_Desc=description)
                send_mail(subject, body, sender_email, [recipient_email], fail_silently=True)  # FOR CEO
                send_mail(subject2, body2, sender_email, [recipient_email2], fail_silently=True)  # FOR Clients
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    return HttpResponse("Failed")


def fetchCustomer(request):
    if Customer.objects.filter(name=request.GET.get('name'), email=request.GET.get('email'),
                               phone=request.GET.get('phone'), outline_Desc=request.GET.get('desc')).count() == 1:
        duplicated = True
    else:
        duplicated = False
    data = [{'duplicated': duplicated}]
    return JsonResponse({'customers': data})


def handle404(request, exception):
    return render(request, '404Page.html')
