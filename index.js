const express = require('express');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const path = require('path');
const app = express();
const Posts = require('./posts')
var session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs')

mongoose.connect('mongodb+srv://root:09lvYBneTteN9pts@cluster0.hn9yyei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',).then(()=>{
    console.log('Conectado com sucesso');

}).catch((err)=>{
    console.log(err.message)
})

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}))

app.use(session({
    secret:'keyboard cat',
    cookie: {maxAge:60000}
}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/',(req,res)=>{
    if(req.query.busca == null){
        Posts.find({}).sort({'_id':-1}).exec((err,posts)=>{
            posts = posts.map((val)=>{
                return{
                    titulo:val.titulo,
                    conteudo:val.conteudo,
                    descricaoCurta:val.conteudo.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                    categoria:val.categoria
                }
            })
            Posts.find({}).sort({'views':-1}).limit(3).exec((err,postsTop)=>{
                postsTop = postsTop.map((val)=>{
                    return{
                        titulo:val.titulo,
                        conteudo:val.conteudo,
                        descricaoCurta:val.conteudo.substr(0,100),
                        imagem:val.imagem,
                        slug:val.slug,
                        categoria:val.categoria,
                        views: val.views
                    }
                })
                res.render('home',{posts:posts, postsTop:postsTop})
            })
        })
    }else{
        Posts.find({titulo: {$regex: req.query.busca,$options:"i"}}, (err,posts)=>{
            posts = posts.map((val)=>{
                return{
                    titulo:val.titulo,
                    conteudo:val.conteudo,
                    descricaoCurta:val.conteudo.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                    categoria:val.categoria,
                    views: val.views
                }
            })
            res.render('busca',{posts:posts, contagem:posts.length});
        })
    }
});

app.get('/:slug',(req,res)=>{
    Posts.findOneAndUpdate({slug:req.params.slug}, {$inc: {views:1}}, {new:true}, (err,resposta)=>{
        if(resposta != null){
            Posts.find({}).sort({'views':-1}).limit(3).exec((err,postsTop)=>{
                postsTop = postsTop.map((val)=>{
                    return{
                        titulo:val.titulo,
                        conteudo:val.conteudo,
                        descricaoCurta:val.conteudo.substr(0,100),
                        imagem:val.imagem,
                        slug:val.slug,
                        categoria:val.categoria,
                        views: val.views
                    }
                })
            res.render('single',{noticia:resposta, postsTop:postsTop});
            })
        }else{
            res.redirect('/')
        }  
    }) 
})
var usuarios = [
    {
        login: 'felipe',
        senha: '12'
    }
]
app.post('/admin/login',(req,res)=>{
    usuarios.map((val)=>{
        if(val.login == req.body.login && val.senha == req.body.senha){
            req.session.login = "felipe";
        }
    })
    res.redirect('/admin/login')
})
app.get('/admin/login',(req,res)=>{
    if(req.session.login == null){
        res.render('admin-login')
    }else{
        Posts.find({}).sort({'views':-1}).limit(3).exec((err,posts)=>{
            posts = posts.map((val)=>{
                return{
                    id: val._id,
                    titulo:val.titulo,
                    conteudo:val.conteudo,
                    descricaoCurta:val.conteudo.substr(0,100),
                    imagem:val.imagem,
                    slug:val.slug,
                    categoria:val.categoria,
                }
            })
            res.render('admin-panel',{posts:posts})
        })
    }
})

app.post('/admin/cadastro',(req,res)=>{
    let formato = req.files.arquivo.name.split('.');
    var imagem = ""
    if(formato[formato.length - 1] == "jpg" || formato[formato.length - 1] == "png"){
        imagem = new Date().getTime()+'.jpg'
        req.files.arquivo.mv(__dirname+'/public/images/'+imagem)
    }else{
        fs.unlinkSync(req.files.arquivo.tempFilePath)
    }

    Posts.create({
        titulo:req.body.titulo_noticia,
        imagem: 'http://localhost:5000/public/images/'+imagem,
        categoria:"Nenhuma",
        conteudo:req.body.noticia,
        slug:req.body.slug,
        autor:'Felipe',
        views: 0
    })
    res.redirect('/admin/login')
})

app.get('/admin/deletar/:id',(req,res)=>{
    Posts.deleteOne({_id:req.params.id}).then(()=>{
        res.redirect('/admin/login')
    })
})

app.listen(5000,()=>{
    console.log('server rodando!');
})