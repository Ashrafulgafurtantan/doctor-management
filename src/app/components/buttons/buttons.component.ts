import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  simpleAlert(){
    Swal.fire('Hello world!');
  }

  alertWithSuccess(){
    Swal.fire('Good Job', 'Successfully Logged In', 'OK')
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result:any) => {
      if (result.value) {
        Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
        )
      }
    })
  }
}
