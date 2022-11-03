import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.scss']
})
export class DefaultDialogComponent implements OnInit {
  dialogTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<DefaultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [string]
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data[0];
    console.log('dial',this.dialogTitle);
  }

}
