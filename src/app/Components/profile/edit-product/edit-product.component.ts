import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: any = {};
  id: any;
  constructor(private myactivateRoute: ActivatedRoute, private myProductService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProduct();
  }
  async getProduct() {
    this.id = this.myactivateRoute.snapshot.params.id;
    await this.myProductService.getProduct(this.id).subscribe(
      (res) => { this.product = res },
      (err) => { console.log(err) }
    )
  }
  async updateProduct(title: any, desc: any, priceDay: any) {
    let dataNew = {
      "title": title,
      "desc": desc,
      "price_by_day": priceDay
    }
    await this.myProductService.UpdateProduct(this.id, dataNew).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => { console.log(err) },
    );
    this.router.navigateByUrl('/profile/profile/myProducts')
  }
}
