import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService } from '../../services/rickAndMorty.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  imports: [CommonModule]
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }
}
