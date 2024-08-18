import { Component, OnInit } from '@angular/core';
import { User, UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
 // user: User []=[];
  displayedColumns:string[]=['firstname','lastname','age','actions'];
  userForm: FormGroup
  users: User[] = []; // Change to an array of users
  userId: string = '';
  isEditMode: boolean = false;
  dataSource:MatTableDataSource<User>
  

  constructor(private userService: UserServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    
  ) {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      age: ['']
    })
    this.dataSource=new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.viewUsers(); // Ensure plural naming to reflect multiple users
  }

  onSubmit(): void {
  if(this.userForm.valid){
   const formValues= this.userForm.value;
  
    if(!this.isEditMode) {
      this.userService.createUser(formValues).subscribe(response => {
        console.log('User created:', response);
        // Optionally, refresh the user list or clear the form
        this.viewUsers(); // Refresh the user list after creation
      });
    }
    else {
      this.editUser(this.userId,formValues);
    }
  }
  }

  viewUsers(): void {
    
    this.userService.viewUsers().subscribe(
      (data: User[]) => { // Expect an array of users
        this.users = data;
        this.dataSource.data=data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  viewOneUser(id?:string):void{
    if(id) {
      console.log(id)
      // this.userId = id;
       try {
        //  this.userId = this.route.snapshot.paramMap.get('id') || " ";
        //  console.log("within viewoneuser", this.userId);
           this.userService.viewOneUser(id).subscribe( (user:User) => {
             this.userForm.patchValue(user)
             console.log(this.userForm.value);
             this.isEditMode=true;
             console.log(this.isEditMode,id)
             this.userId=id;
             console.log("userId=",this.userId)
           }
 
         );
       } catch (err) {
         console.log(err)
       }
     }
     else {
       console.log('no id provided')
     }
   }
   editUser(id: string, formValues: any): void {
    
    this.userService.editUser(id, formValues).subscribe(
      response => {

        console.log('User updated successfully:', response);
        this.viewUsers();
        this.isEditMode=false;
        this.userForm.reset();
        
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
    }

    deleteUser(id:string):void {
      const this_user = id? id: '';
      this.userService.deleteOneUser(this_user).subscribe(
        response => {
          console.log('Deleted User', response);
          this.viewUsers();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  

  


