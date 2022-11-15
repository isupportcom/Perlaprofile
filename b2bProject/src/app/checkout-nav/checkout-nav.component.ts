import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-checkout-nav',
  templateUrl: './checkout-nav.component.html',
  styleUrls: ['./checkout-nav.component.css']
})
export class CheckoutNavComponent implements OnInit {

  constructor(
    private translateService: TranslateConfigService
  ) { }

  ngOnInit(): void {
  }

}
