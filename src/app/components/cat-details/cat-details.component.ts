import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategories } from '../../core/interfaces/icategories';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.css'
})
export class CatDetailsComponent implements OnInit{
constructor(private _CategoriesService:CategoriesService,private _ActivatedRoute:ActivatedRoute){}
catId!:string|null;
catData!:ICategories;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(cInfo)=>{console.log((cInfo));
      this.catId = cInfo.get('catId');
    }
  })

  this._CategoriesService.GetSpecificCategory(this.catId).subscribe({
    next:(res)=>{console.log(res)
      this.catData=res.data;
    }
  })
}

}
