from django.shortcuts import render,HttpResponse,redirect

from app1 import models
# Create your views here.
# 返回数据
def index1(request):
    return HttpResponse("1323")
# 返回页面
def index(request):
    ret =  models.User.objects.all()
    print(ret)
    return render(request,'index.html')

def login(request):
    if request.method == 'POST':
        user = request.POST.get('user')
        pwd = request.POST.get('pwd')
        print(user, pwd)
        if user == 'admin' and pwd == '123456':
            return redirect("/index/")
    else:
        return render(request, "login.html")

def publisher_list(request):
    publisher_list = models.Publisher.objects.all()
    return render(request,"publisher_list.html",{'publisher_list':publisher_list})

def publisher_add(request):

    if request.method=="POST":
        publisername = request.POST.get("publisername")
        if models.Publisher.objects.filter(name = publisername):
            return render(request,"publisher_add.html",{"error":"出版社已存在"})
            models.Publisher.objects.create(name=publisername)
        return redirect("/publisher_list/")
    return render(request,"publisher_add.html")
def publisher_del(request):
      # pk就是主键
      pk =request.GET.get("pk")
      models.Publisher.objects.get(pk=pk).delete()
      return redirect("/publisher_list/")

def publisher_edit(request):
    pk = request.GET.get("pk")
    pub_obj =  models.Publisher.objects.get(pk=pk)
    if request.method=="GET":
      return render(request,"publisher_edit.html",{'pub_obj':pub_obj})
    else:
        publisername = request.POST.get("publisername")
        pub_obj.name = publisername
        pub_obj.save()
        return redirect("/publisher_list/")

def book_list(request):
    booklist = models.Book.objects.all()
    # for book in booklist:
    #     print(book.pk)
    #     print(book.name)
    #     # book.publisher 书籍所关联出版社对象
    #     print(book.publisher.name)
    return render(request,'book_list.html',{"booklist":booklist})

def book_add(request):
    error=''
    if request.method == "POST":
        bookname = request.POST.get("bookname")
        pub_id = request.POST.get("pub_id")
        if not bookname:
            error="书名不能为空"
        elif models.Book.objects.filter(name=bookname):
            error="此图书已经存在"
        else:
            models.Book.objects.create(name=bookname,publisher_id=pub_id)
            return redirect("/book_list/")
    booklist = models.Publisher.objects.all()
    return render(request,'book_add.html',{"booklist":booklist,"error":error})

def book_del(request):
    pk = request.GET.get("id")
    models.Book.objects.filter(pk=pk).delete()
    return redirect('/book_list/')

def book_edit(request):
    pk = request.GET.get("id")
    book_obj = models.Book.objects.get(pk=pk)
    if request.method=="POST":
       bookname =  request.POST.get('bookname')
       pub_id = request.POST.get('pub_id')
       book_obj.name = bookname
       book_obj.publisher_id=pub_id
       book_obj.save()
       return redirect('/book_list/')
    booklist = models.Publisher.objects.all()
    return render(request,'book_edit.html',{'bookobj':book_obj,"booklist":booklist})
