import json
from django.http import JsonResponse
from django.core import serializers
from .models import *
from django.views.decorators.csrf import csrf_exempt


def createUser(request):
    respData = {}
    if request.method == "POST":
        newUserData = json.loads(request.body)
        user = User.objects.create_user(
            first_name=newUserData['first_name'],
            last_name=newUserData['last_name'],
            password=newUserData['password'],
            username=newUserData['username']
        )
        player = Player()
        player.user = user
        player.age = newUserData['age']
        player.is_senior = True if newUserData['is_senior'].lower(
        ) == 'true' else False
        player.country = newUserData['country']
        player.balance = newUserData['balance']
        player.with_amount = newUserData['with_amount']
        player.hotel_room = newUserData['hotel_room']
        player.win = 0
        player.lost = 0
        player.insurance = True if newUserData['insurance'].lower(
        ) == 'true' else False
        player.save()
        respData['msg'] = "User has been successfully created!"
        respData['userInfo'] = str(
            user.first_name) + " " + str(user.last_name) + " (" + str(user.id) + ")"
        respData['userId'] = str(user.id)
    else:
        respData['msg'] = "Oops! Something went wrong!"
    return JsonResponse(respData, safe=False)


def updateUser(request):
    respData = {}
    if request.method == "POST":
        newUserData = json.loads(request.body)
        user = User.objects.get(username=newUserData['username'])
        user.first_name = newUserData['first_name']
        user.last_name = newUserData['last_name']
        user.password = newUserData['password']
        user.player.age = newUserData['age']
        user.player.is_senior = True if newUserData['is_senior'].lower(
        ) == 'true' else False
        user.player.country = newUserData['country']
        user.player.balance = newUserData['balance']
        user.date_joined = newUserData['date_joined']
        user.player.with_amount = newUserData['with_amount']
        user.player.hotel_room = newUserData['hotel_room']
        user.player.username = newUserData['username']
        user.player.insurance = True if newUserData['insurance'].lower(
        ) == 'true' else False
        user.player.save()
        user.save()
        respData['msg'] = "User data has been successfully updated!"
    else:
        respData['msg'] = "Oops! Something went wrong!"
    return JsonResponse(respData, safe=False)


def getUserDataById(request):
    user = User.objects.get(id=request.POST['user_id'])
    serialized_obj = serializers.serialize('json', [user, user.player])
    return JsonResponse(serialized_obj, safe=False)


def deleteUser(request):
    user = User.objects.get(id=request.POST['user_id'])
    user.player.delete()
    user.delete()
    data = {
        "msg": "User has been succesfully deleted"
    }
    return JsonResponse(data=data, safe=False)


def updateBalance(request):
    user = User.objects.get(id=int(request.POST['userId']))
    data = {
        "user": {
            "fname": user.first_name,
            "lname": user.last_name,
            "balance": user.player.balance
        },
        "balanceChange": request.POST['balanceDifference'],
        "newBalance": int(request.user.player.balance) + int(request.POST['balanceDifference'])
    }
    user.player.balance += int(request.POST['balanceDifference'])
    if int(request.POST['balanceDifference']) > 0:
        user.player.win += int(request.POST['balanceDifference'])
    else:
        user.player.lost += int(request.POST['balanceDifference'])
    user.save()
    user.player.save()
    return JsonResponse(data=data, safe=False)
