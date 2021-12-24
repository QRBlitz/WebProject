from django.urls import path
from . import views
from . import api

api_urlpatterns = [
    path("api/updateBalance", api.updateBalance),
    path("api/deleteUser", api.deleteUser),
    path("api/getUserById", api.getUserDataById),
    path("api/updateUser", api.updateUser),
    path("api/createUser", api.createUser),
]

urlpatterns = [
    path('', views.index, name="main"),
    path('FAQ', views.faq, name="faq"),
    path('feedbacks', views.feedbacks, name="feedbacks"),
    path('games', views.games, name="games"),
    path('login', views.logging_in, name="login"),
    path('profile', views.profile, name="profile"),
    path('registration', views.registration, name="registration"),
    path('schedule', views.schedule, name="schedule"),
    path('logout', views.logging_out, name="logout"),
    path('addPlayerImage', views.addPlayerImage),
    path('payment', views.payment, name="payment"),
    path('admin/', views.admin, name="admin"),
    path('location', views.location, name="location")
]

urlpatterns += api_urlpatterns
