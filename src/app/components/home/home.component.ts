import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/Produto'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  produtos: Produto[] = []

  constructor(private modalService: NgbModal,private  http:HttpClient) { 
    /*
    const celular = new Produto(
      'Iphone',
      'Celular da marca Apple',
      2000
    );

    for (let i = 0; i < 10; i++) {
      this.produtos.push(celular);
    }
    */
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

  addProduto(data){
    //   this.http.post('https://bd00f777-5247-4ede-8412-df3111db561e.mock.pstmn.io/post_test',data)
    //   .subscribe((result)=>{
    //     console.log("Resultado:", result)
    //   })
       console.log(data);
  };

  getProdutos(){
    this.http.get<Produto[]>('https://f507a26a-0bf4-46f2-a15e-b95adb5d1f1e.mock.pstmn.io/produtos')
    .subscribe(
      response => {
      console.log(response);
      this.produtos = response;
      console.log(this.produtos);
    }
    )
  }

  dellProduto(prodid){
    try {
    console.log(prodid);
    this.http.post('https://f507a26a-0bf4-46f2-a15e-b95adb5d1f1e.mock.pstmn.io/post_mock',prodid)
    .subscribe(
      response => {
        console.log(response);
      }
    )
      alert('Produto deletado!');
    } catch(e){
      console.log(e);
      alert('Ocorreu um erro ao deletar o produto!');
    }
  }

  ngOnInit(): void {
    this.getProdutos();
  }

}


