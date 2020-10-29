import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  closeResult = '';


  constructor(private modalService: NgbModal, private http:HttpClient) { }

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
 //   this.http.post('https://bd00f777-5247-4ede-8412-df3111db561e.mock.pstmn.io/post_test',data)
 //   .subscribe((result)=>{
 //     console.log("Resultado:", result)
 //   })
    console.log(data);

  }

  
  onSubmitCadastro(data){
    //   this.http.post('https://bd00f777-5247-4ede-8412-df3111db561e.mock.pstmn.io/post_test',data)
    //   .subscribe((result)=>{
    //     console.log("Resultado:", result)
    //   })
       console.log(data);
  };

}
