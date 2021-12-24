from django.shortcuts import render, redirect
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from .models import *

# Create your views here.


def faq(request):
    return render(request, 'MyCasino/FAQ.html')


def feedbacks(request):
    context = {}
    context['feedbacks'] = Feedback.objects.all()
    return render(request, 'MyCasino/feedbacks.html', context)


def games(request):
    return render(request, 'MyCasino/games.html')


def payment(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.player.balance += int(request.POST['amount'])
        user.save()
        user.player.save()
        return redirect("profile")
    return render(request, 'MyCasino/payment.html')


def addPlayerImage(request):
    if request.method == "POST":
        postfix = request.FILES['newAvatar'].name[request.FILES['newAvatar'].name.rfind(
            "."):]
        title = request.user.email
        request.FILES['newAvatar'].name = request.user.email+postfix
        user = User.objects.get(id=request.user.id)
        user.player.avatar = request.FILES['newAvatar']
        user.save()
        user.player.save()
    return redirect("profile")


def logging_out(request):
    logout(request)
    return redirect("main")


def logging_in(request):
    context = {}
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("profile")
        else:
            context['err'] = "No such user!"
            return render(request, 'MyCasino/login.html', context)

    return render(request, 'MyCasino/login.html', context)


def profile(request):
    context = {
        "msg": "",
        "user1": None
    }
    if request.user.is_authenticated and not "user_id" in request.GET:
        context['user1'] = User.objects.get(id=request.user.id)
    elif "user_id" in request.GET:
        context['user1'] = User.objects.get(id=request.GET['user_id'])
    else:
        context['msg'] = "You are not authenticated and have not selected user to show!"
    return render(request, 'MyCasino/profile.html', context)


def registration(request):
    context = {}
    if request.method == "POST":
        if request.POST['password'] != request.POST['password_confirm']:
            context['err'] = "Passwords aren't matching!"
            return render(request, "MyCasino/registration.html", context)
        b_day = request.POST['bday']
        parsed_birth_day = b_day.split("-")
        date = datetime.date.today()
        year = date.strftime("%Y")
        if int(year)-int(parsed_birth_day[0]) < 21:
            context['err'] = "You must be 21 years old or older to access this site!"
            return render(request, "MyCasino/registration.html", context)
        username = request.POST['username']
        first_name = request.POST['fname']
        last_name = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        country = request.POST['country']
        user = User.objects.create_user(
            first_name=first_name, username=username, last_name=last_name, email=email, password=password)
        user.save()
        is_senior = int(year)-int(parsed_birth_day[0]) >= 60
        player = Player(user=user, country=country, age=int(
            year)-int(parsed_birth_day[0]), is_senior=is_senior, win=0, lost=0, hotel_room=user.id, favorite_slot="None")
        player.save()
        context['err'] = "Account successfully created! You can now go to signing-in!"
    return render(request, 'MyCasino/registration.html', context)


def schedule(request):
    return render(request, 'MyCasino/schedule.html')


def location(request):
    return render(request, 'MyCasino/location.html')


def index(request):
    return render(request, 'MyCasino/index.html')


def admin(request):
    context = {}
    if (not request.user.is_staff):
        context['msg'] = "You have no rights to access this resource!"
    else:
        context['users'] = User.objects.all()
        context['feedbacks'] = Feedback.objects.all()
    return render(request, 'MyCasino/admin.html', context)
