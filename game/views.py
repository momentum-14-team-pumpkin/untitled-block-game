from django.shortcuts import render

# NOTE: temp code for frontend development - Alexis
def tilemap_test(req):
    return render(req, "game/tilemap-test.html")
