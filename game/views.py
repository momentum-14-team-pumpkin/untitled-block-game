from django.shortcuts import render

# Create your views here.
def tilemap_test(req):
    return render(req, "game/tilemap-test.html")
