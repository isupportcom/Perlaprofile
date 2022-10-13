import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  flag: boolean = false;
  team = [
    {
      img: '../../assets/team1.jpg',
      name: 'Κωνσταντίνος Αγγελακάρης',
      role: 'Διευθύνων Σύμβουλος',
      description: 'Στόχος μας είναι να δημιουργούμε και να προσφέρουμε καινοτόμα προϊόντα τα οποία καλύπτουν όλες τις σύγχρονες ανάγκες τις αγοράς.'
    },
    {
      img: '../../assets/team2.jpg',
      name: 'Στέλλα Αγγελακάρη',
      role: 'Υπεύθυνη Λογιστηρίου',
      description: 'Ο Πιστωτικός έλεγχος πελατών, ο έλεγχος και ενημέρωση υπολοίπων και οι πληρωμές προμηθευτών είναι η βασική μας αρμοδιότητα στο τμήμα μας.'
    },
    {
      img: '../../assets/team3.jpg',
      name: 'Αγγελική Τζιάνα',
      role: 'Υπεύθυνη Τμήματος Παραγγελιών',
      description: 'Η άμεση εξυπηρέτηση και η σωστή λήψη παραγγελιών είναι ο καθημερινός μας στόχος.'
    },
    {
      img: '../../assets/team4.jpg',
      name: 'Ανθή Λελεκίδου',
      role: 'Υπεύθυνη Εξαγωγών',
      description: 'Η παραλαβή παραγγελιών, προετοιμασία προσφορών, έλεγχος φορτώσεων και η αποστολή όλων των παραστατικών και απαραίτητων εγγράφων είναι η καθημερινή μας αποστολή.'
    },
    {
      img: '../../assets/team5.jpg',
      name: 'Κωνσταντίνος Γουργούλας',
      role: 'Υπεύθυνος Εμπορικού Τμήματος Προφίλ',
      description: 'Η άρτια γνώση των κωδικών και τεχνικών χαρακτηριστικών των προφίλ είναι το βασικό στοιχεία για την άμεση εξυπηρέτηση των πελατών μας.'
    },
    {
      img: '../../assets/team6.jpg',
      name: 'Εφραίμ Τοψίνογλου',
      role: 'Υπεύθυνος Φορτώσεων - Μεταφορών',
      description: 'Η σωστή και ασφαλής μεταφορά των εμπορευμάτων με την κατάλληλη συσκευασία είναι ο βασικός στόχος.'
    },
    {
      img: '../../assets/team7.jpg',
      name: 'Στέλιος Φούγιας',
      role: 'Υπεύθυνος Παραγωγής Έτοιμων Ρολών - Σίτας',
      description: 'Η παραγωγή σωστών και λειτουργικών προϊόντων είναι ο καθημερινός μας στόχος.'
    },
    {
      img: '../../assets/team8.jpg',
      name: 'Ιορδάνης Δομετίου',
      role: 'Υπεύθυνος Παραγωγής Γκαραζόπορτας - Φυσσούνας',
      description: 'Η κάθε παραγγελία μας μελετάτε και κατασκευάζετε με απόλυτη προσοχή και ποιοτικό έλεγχο.'
    },

    {
      img: '../../assets/team10.jpg',
      name: 'Flamour Shehi',
      role: 'Υπεύθυνος Παραγωγής Σίτας Πλισέ',
      description: 'Με απόλυτη προσοχή ελέγχουμε όλες τις πρώτες ύλες πριν από την παραγωγή αντικουνουπικών συστημάτων για την κατασκευή ποιοτικών προϊόντων.'
    },

    {
      img: '../../assets/team12.jpg',
      name: 'Χριστόφορος Σικοβάρης',
      role: 'Υπεύθυνος Εξαρτημάτων - Αναλωσίμων',
      description: 'Εξυπηρετούμε καθημερινά κάθε ανάγκη των επαγγελματιών προσφέροντας κορυφαία προϊόντα σε μεγάλη γκάμα άμεσα διαθέσιμη.'
    },
  ]

  // {
  //   img: '../../assets/team9.jpg',
  //   name: 'Γιώργος Χατζής',
  //   role: 'Υπεύθυνος Παραγωγής Σίτας Μπάρας',
  //   description: 'Ο έλεγχος στις λεπτομέρειες σε κάθε παραγωγική διαδικασία εξασφαλίζει την ποιότητα του προϊόντος.'
  // },
  // {
  //   img: '../../assets/team11.jpg',
  //   name: 'Jhony',
  //   role: 'Υπεύθυνος Παραγωγής Εξαρτημάτων',
  //   description: 'Παράγουμε και ελέγχουμε σχολαστικά αναλώσιμα εξαρτήματα για ρολά και σίτες.'
  // },

  innerWidth: any;
  @HostListener('window:resize', ['$event'])
    onResize(event: any){
     this.innerWidth = window.innerWidth;
      if(this.innerWidth <= 768){
        this.flag = true;
      }
      else{
        this.flag = false;
      }

    }

  constructor(private translate:TranslateConfigService) { }
teamNames:any;
  async ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 768){
      this.flag = true;
    }
    else{
      this.flag = false;
    }
    let teamObs = (await this.translate.getPage())
    teamObs.subscribe(res=>{
      console.log(res);
      this.teamNames = res.person
      console.log(this.teamNames);

    })

  }


}
