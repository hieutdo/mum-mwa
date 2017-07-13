import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DbService } from './db.service';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private db: DbService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.db.getStudent(next.params.id).map(student => {
      if (!student) {
        this.router.navigate(['404']);
        return false;
      }
      return true;
    });
  }
}
