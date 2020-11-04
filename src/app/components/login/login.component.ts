import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import {Router} from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  closeResult = '';



  constructor(private modalService: NgbModal, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmitLogin(data){
    try {

     this.http.post('http://localhost:3000/login/logar',data)
    .subscribe((result)=>{
      if (result != null && result.ativo){
        this.router.navigate(['/home'])
      } else{ alert('Usuario não cadastrado ou senha incorreta (em caso de erros utilizar 123, 123)')}
    })
  } catch(e){
    console.log(e);
    alert('Ocorreu um erro ao ao logar!');
  }
 
  }

  
  onSubmitCadastro(data){
    try {
      var datacadastro = {
        "pessoa":{"nome":data.nome,
         "sobrenome":data.sobrenome,
         "endereco":data.endereco,
         "hashId":data.hashId,
         "sexo":data.sexo
        },
         "login":{"username":data.username,
          "password":data.password}}


      this.http.post('http://localhost:3000/pessoa/createPessoa',datacadastro)
      .subscribe((result)=>{
        console.log("Resultado:", result)
       
      })

    } catch(e){
      console.log(e);
      alert('Ocorreu um erro ao ao cadastrar!');
    }
  };

}
