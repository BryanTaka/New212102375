import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css'],
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable();

    this.bind_mahasiswa();
  }

  ngOnInit(): void {}

  bind_mahasiswa(): void {
    this.http
      .get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.log(data);

        data.forEach((element: any) => {
          var tempatTanggallahir =
            element.tempatLahir + ',' + element.TanggalLahir;

          var row = [
            element.NIM,
            element.Nama,
            element.jenisKelamin,
            element.tempatTanggallahir,
            element.Jp,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });
  }
}
