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
    try{
      this.http.post('http://localhost:3000/produto/',data)
       .subscribe((result)=>{
         console.log("Resultado:", result)
       })
       console.log(data);
      }catch(e){
        console.log(e);
        alert('Ocorreu um erro ao adicionar o produto!');
      }
       this.getProdutos();
  };

  getProdutos(){
    try {
    this.http.get<Produto[]>('http://localhost:3000/produto/')
    .subscribe(
      response => {
      this.produtos = response;
      })
      }catch(e){
        console.log(e);
        alert('Ocorreu um erro ao buscar os produtos!');
      }
    }
    
  

  dellProduto(prodid){
    try {
    console.log(prodid);
    this.http.delete('http://localhost:3000/produto/',prodid)
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
  };

  ngOnInit(): void {
    this.getProdutos();
  }

}


