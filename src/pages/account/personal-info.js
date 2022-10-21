import * as React from "react";
import { Link } from "react-router-dom";
import {
  Currency,
  ErrorMsg,
  SelectDays,
  SelectMonths,
  SelectYears,
} from "./../../components";
import AppContext from "../../context";
import { useForm } from "react-hook-form";
import useFormState from "./../../hooks/useFormState";
import { userUpdate } from "../../Services";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { NotificationManager } from "react-notifications";
import { showLoader, hideLoader } from "../../helper/loader";

export default function Browse({ history }) {
  const {
    dispatch,
    updateUserData,
    userData,
    validateEmail,
    notify,
    errorResponse,
  } = React.useContext(AppContext);
  //let { firstname, lastname, email, gender, phone, dob } = userData;
  const { modalState, closeModal, showModal } = useModal();

  const [dobDay] = React.useState(() => moment(userData?.dob).format("DD"));
  const [dobMonth] = React.useState(() => moment(userData?.dob).format("MM"));
  const [dobYear] = React.useState(() => moment(userData?.dob).format("YYYY"));

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      gender: userData?.gender,
      phone: userData?.phone,
      dobDay,
      dobMonth,
      dobYear,
    },
  });
  const { toggleFormState } = useFormState("form-user-update");


  ///UPDATE PASSWORD FORM STATE

  const [currentpassword , setCurrentPassword] = useState("");
  const [newpassword ,  setNewPassword] = useState("");
  const [confirmpassword , setConfirmPassword] = useState("");
  const [passwordmatched , setPasswordMatched] = useState(false);
  const [states, setStates] = useState([]);

  const [passed , setPassed] = useState(false);
  
  const [lag, setUserLga] = useState([]);
  const [selected , setSelected] = useState("");

  const [selectedlga , setSelectedlga] = useState("");

  const [address , setAddress] = useState("");
  const [validaddres, setValidAddress] = useState(false);

  //previous details

  const [prestate , setPreState] = useState("");
  const [prelga , setPreLga] = useState("");
  const [preaddress , setPreAddress] = useState("");

//password Toggle 

//hanndle update click 

function handleUpdateClick(e){
  e.preventDefault();
  //alert('Working')

  if(selected == "" || selectedlga == "" || address == ""){
    return NotificationManager.error("Complete the necessary Fields");
  }

  else{
    
    showLoader();
    axios.post(`${process.env.REACT_APP_API_URL}profile/update/address`,{
          
      //request body here to complete appointment process
  state : selected ,
  lga : selectedlga ,
  address : address
  

      }).then(response => {
          console.log(response)
          hideLoader();
          console.log(response.data)
          
          if(response.data.noerror == true){
            //return NotificationManager.success("Contact Address Updated Successfully");
            Swal.fire(
              'Address Updated Successfully',
             
              'success'
            )
            window.location.reload(false);
            
             
          }


      }).catch(error => {
          console.log(error)
      })

  }
}

function passwordToggle(e){
  let myinput = document.getElementById("passwordInput");
  let myinputwo = document.getElementById("passwordInputtwo");
  let myinputhree = document.getElementById("passwordInputthree");

  if(myinput.type === "password"){
    myinput.type = "text";
    myinputwo.type = "text";
    myinputhree.type = "text";
  }

  else{
    myinput.type = "password";
    myinputwo.type = "password";
    myinputhree.type = "password";
  }
}


  //current password input handler

  function handleCurrentPassword(e){
    setCurrentPassword(e.target.value);
  }

  //new passworf input handler 

  // function handleNewPassword(e){
  //   setNewPassword(e.target.value);
  // }

  function handleNewPassword(e){
    setNewPassword(e.target.value);
  
    let lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    
    var special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
  
    if (
      !newpassword.match(lowerCaseLetters) ||
      !newpassword.match(upperCaseLetters) ||
      !newpassword.match(numbers) ||
      !newpassword.match(special) ||
      newpassword.length < 8
    ) {
      // return NotificationManager.error(
      //   "Invalid password, password must contain,uppercase,lowercase and greater than 8 caracters"
      // );
  
      setPassed(false);
    }
  
    else{
      setPassed(true);
    }
  
    
  
  }

  //confirm password input handler

  function handleConfirmPassword(e){
    setConfirmPassword(e.target.value);

    
  }


  function handleKeyUp(e){
    
    if(e.target.value == newpassword){
      setPasswordMatched(true);
    } 

    else{
      setPasswordMatched(false);
    }
  }


  function handleSelected(e){
    e.preventDefault()

    console.log(e.target.value)

    
   

    // console.log(`http://locationsng-api.herokuapp.com/api/v1/states/${userstate}/lgas`)
//     axios.get(`http://locationsng-api.herokuapp.com/api/v1/states/${userstate}/lgas`, {
     
//     }).then(response => {
//     console.log(response.data)

//     //setUserLga(response.data)

    

   


// }).catch(error => {
//     console.log(error)
// })

  }
  function onFormSubmit(e){
    e.preventDefault();

    //change password Route

    
    axios.post(`${process.env.REACT_APP_API_URL}auth/password`,{
     'current_password':currentpassword,
     'password':newpassword
      
  }).then(response => {
      console.log(response)

      if(response.data.status == true){
          Swal.fire(
              'Password Updated!',
              `${response.data.message}`,
              'success'
            )
         
      }

      else if(response.data.status == false){
        Swal.fire(
          'Invalid Credential',
          `${response.data.error}`,
          'error'
        )
      }
  }).catch(error => {
      console.log(error)
  })

    

   
    
  }
  var mystates = [
    {
      "state": "Adamawa",
      "alias": "adamawa",
      "lgas": [
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Gombi",
        "Grie",
        "Hong",
        "Jada",
        "Larmurde",
        "Madagali",
        "Maiha",
        "Mayo Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South"
      ]
    },
    {
      "state": "Akwa Ibom",
      "alias": "akwa_ibom",
      "lgas": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono-Ibom",
        "Ikot Abasi",
        "Ika",
        "Ikono",
        "Ikot Ekpene",
        "Ini",
        "Mkpat-Enin",
        "Itu",
        "Mbo",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Udung-Uko",
        "Ukanafun",
        "Oruk Anam",
        "Uruan",
        "Urue-Offong/Oruko",
        "Uyo"
      ]
    },
    {
      "state": "Anambra",
      "alias": "anambra",
      "lgas": [
        "Aguata",
        "Anambra East",
        "Anaocha",
        "Awka North",
        "Anambra West",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi"
      ]
    },
    {
      "state": "Ogun",
      "alias": "ogun",
      "lgas": [
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo/Ota",
        "Egbado North",
        "Ewekoro",
        "Egbado South",
        "Ijebu North",
        "Ijebu East",
        "Ifo",
        "Ijebu Ode",
        "Ijebu North East",
        "Imeko Afon",
        "Ikenne",
        "Ipokia",
        "Odeda",
        "Obafemi Owode",
        "Odogbolu",
        "Remo North",
        "Ogun Waterside",
        "Shagamu"
      ]
    },
    {
      "state": "Ondo",
      "alias": "ondo",
      "lgas": [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure North",
        "Akure South",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Irele",
        "Ile Oluji/Okeigbo",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ose",
        "Ondo East",
        "Owo"
      ]
    },
    {
      "state": "Rivers",
      "alias": "rivers",
      "lgas": [
        "Abua/Odual",
        "Ahoada East",
        "Ahoada West",
        "Andoni",
        "Akuku-Toru",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Emuoha",
        "Eleme",
        "Ikwerre",
        "Etche",
        "Gokana",
        "Khana",
        "Obio/Akpor",
        "Ogba/Egbema/Ndoni",
        "Ogu/Bolo",
        "Okrika",
        "Omuma",
        "Opobo/Nkoro",
        "Oyigbo",
        "Port Harcourt",
        "Tai"
      ]
    },
    {
      "state": "Bauchi",
      "alias": "bauchi",
      "lgas": [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas/Gadau",
        "Jama'are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        "Toro",
        "Warji",
        "Zaki"
      ]
    },
    {
      "state": "Benue",
      "alias": "benue",
      "lgas": [
        "Agatu",
        "Apa",
        "Ado",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya"
      ]
    },
    {
      "state": "Borno",
      "alias": "borno",
      "lgas": [
        "Abadam",
        "Askira/Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Guzamala",
        "Gubio",
        "Hawul",
        "Gwoza",
        "Jere",
        "Kaga",
        "Kala/Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Mobbar",
        "Marte",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani"
      ]
    },
    {
      "state": "Bayelsa",
      "alias": "bayelsa",
      "lgas": [
        "Brass",
        "Ekeremor",
        "Kolokuma/Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa"
      ]
    },
    {
      "state": "Cross River",
      "alias": "cross_river",
      "lgas": [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar Municipal",
        "Calabar South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakuur",
        "Yala"
      ]
    },
    {
      "state": "Delta",
      "alias": "delta",
      "lgas": [
        "Aniocha North",
        "Aniocha South",
        "Bomadi",
        "Burutu",
        "Ethiope West",
        "Ethiope East",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ukwuani",
        "Ughelli South",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West"
      ]
    },
    {
      "state": "Ebonyi",
      "alias": "ebonyi",
      "lgas": [
        "Abakaliki",
        "Afikpo North",
        "Ebonyi",
        "Afikpo South",
        "Ezza North",
        "Ikwo",
        "Ezza South",
        "Ivo",
        "Ishielu",
        "Izzi",
        "Ohaozara",
        "Ohaukwu",
        "Onicha"
      ]
    },
    {
      "state": "Edo",
      "alias": "edo",
      "lgas": [
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba Okha",
        "Orhionmwon",
        "Oredo",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde"
      ]
    },
    {
      "state": "Ekiti",
      "alias": "ekiti",
      "lgas": [
        "Ado Ekiti",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Gbonyin",
        "Ido Osi",
        "Ijero",
        "Ikere",
        "Ilejemeje",
        "Irepodun/Ifelodun",
        "Ikole",
        "Ise/Orun",
        "Moba",
        "Oye"
      ]
    },
    {
      "state": "Enugu",
      "alias": "enugu",
      "lgas": [
        "Awgu",
        "Aninri",
        "Enugu East",
        "Enugu North",
        "Ezeagu",
        "Enugu South",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South",
        "Isi Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Udenu",
        "Oji River",
        "Uzo Uwani",
        "Udi"
      ]
    },
    {
      "state": "Federal Capital Territory",
      "alias": "abuja",
      "lgas": [
        "Abaji",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
        "Municipal Area Council"
      ]
    },
    {
      "state": "Gombe",
      "alias": "gombe",
      "lgas": [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu/Deba"
      ]
    },
    {
      "state": "Jigawa",
      "alias": "jigawa",
      "lgas": [
        "Auyo",
        "Babura",
        "Buji",
        "Biriniwa",
        "Birnin Kudu",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kazaure",
        "Kiri Kasama",
        "Kiyawa",
        "Kaugama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Sule Tankarkar",
        "Roni",
        "Ringim",
        "Yankwashi",
        "Taura"
      ]
    },
    {
      "state": "Oyo",
      "alias": "oyo",
      "lgas": [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibarapa Central",
        "Ibadan South-West",
        "Ibarapa East",
        "Ido",
        "Ibarapa North",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo",
        "Oyo East",
        "Saki East",
        "Saki West",
        "Surulere Oyo State"
      ]
    },
    {
      "state": "Imo",
      "alias": "imo",
      "lgas": [
        "Aboh Mbaise",
        "Ahiazu Mbaise",
        "Ehime Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte/Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Mbaitoli",
        "Isu",
        "Ngor Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji/Egbema",
        "Okigwe",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri Municipal",
        "Owerri North",
        "Unuimo",
        "Owerri West"
      ]
    },
    {
      "state": "Kaduna",
      "alias": "kaduna",
      "lgas": [
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Ikara",
        "Igabi",
        "Jaba",
        "Jema'a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria"
      ]
    },
    {
      "state": "Kebbi",
      "alias": "kebbi",
      "lgas": [
        "Aleiro",
        "Argungu",
        "Arewa Dandi",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko/Besse",
        "Maiyama",
        "Ngaski",
        "Shanga",
        "Suru",
        "Sakaba",
        "Wasagu/Danko",
        "Yauri",
        "Zuru"
      ]
    },
    {
      "state": "Kano",
      "alias": "kano",
      "lgas": [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun Mallam",
        "Gezawa",
        "Gaya",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Takai",
        "Sumaila",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil"
      ]
    },
    {
      "state": "Kogi",
      "alias": "kogi",
      "lgas": [
        "Ajaokuta",
        "Adavi",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela Odolu",
        "Ijumu",
        "Kogi",
        "Kabba/Bunu",
        "Lokoja",
        "Ofu",
        "Mopa Muro",
        "Ogori/Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Yagba East",
        "Yagba West"
      ]
    },
    {
      "state": "Osun",
      "alias": "osun",
      "lgas": [
        "Aiyedire",
        "Atakunmosa West",
        "Atakunmosa East",
        "Aiyedaade",
        "Boluwaduro",
        "Boripe",
        "Ife East",
        "Ede South",
        "Ife North",
        "Ede North",
        "Ife South",
        "Ejigbo",
        "Ife Central",
        "Ifedayo",
        "Egbedore",
        "Ila",
        "Ifelodun",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo"
      ]
    },
    {
      "state": "Sokoto",
      "alias": "sokoto",
      "lgas": [
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Isa",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
        "Binji",
        "Bodinga",
        "Dange Shuni",
        "Goronyo",
        "Gada"
      ]
    },
    {
      "state": "Plateau",
      "alias": "plateau",
      "lgas": [
        "Bokkos",
        "Barkin Ladi",
        "Bassa",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang South",
        "Langtang North",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase"
      ]
    },
    {
      "state": "Taraba",
      "alias": "taraba",
      "lgas": [
        "Ardo Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim Lamido",
        "Kumi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing"
      ]
    },
    {
      "state": "Yobe",
      "alias": "yobe",
      "lgas": [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari"
      ]
    },
    {
      "state": "Zamfara",
      "alias": "zamfara",
      "lgas": [
        "Anka",
        "Birnin Magaji/Kiyaw",
        "Bakura",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura Namoda",
        "Maradun",
        "Shinkafi",
        "Maru",
        "Talata Mafara",
        "Tsafe",
        "Zurmi"
      ]
    },
    {
      "state": "Lagos",
      "alias": "lagos",
      "lgas": [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Badagry",
        "Apapa",
        "Epe",
        "Eti Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Mushin",
        "Lagos Mainland",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere Lagos State"
      ]
    },
    {
      "state": "Katsina",
      "alias": "katsina",
      "lgas": [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Danja",
        "Dandume",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai'Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango"
      ]
    },
    {
      "state": "Kwara",
      "alias": "kwara",
      "lgas": [
        "Asa",
        "Baruten",
        "Edu",
        "Ilorin East",
        "Ifelodun",
        "Ilorin South",
        "Ekiti Kwara State",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke Ero",
        "Oyun",
        "Pategi"
      ]
    },
    {
      "state": "Nasarawa",
      "alias": "nasarawa",
      "lgas": [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Lafia",
        "Kokona",
        "Nasarawa Egon",
        "Nasarawa",
        "Obi",
        "Toto",
        "Wamba"
      ]
    },
    {
      "state": "Niger",
      "alias": "niger",
      "lgas": [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Mariga",
        "Magama",
        "Mokwa",
        "Mashegu",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi"
      ]
    },
    {
      "state": "Abia",
      "alias": "abia",
      "lgas": [
        "Aba North",
        "Arochukwu",
        "Aba South",
        "Bende",
        "Isiala Ngwa North",
        "Ikwuano",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umu Nneochi"
      ]
    }
  ];

  React.useEffect(() => {
    //console.log(userData, 'userData..')
    //setValue([{ name: userData.name }, { phone: userData.phone }]);
    //console.log(userData)
  }, [userData]);

  React.useEffect(() => {
    
    var token = localStorage.getItem('token');

    if(token){
      axios.get(`${process.env.REACT_APP_API_URL}auth/user`, {
     
      }).then(response => {
      console.log('uservalue',response.data.user.address)

      console.log('user',response.data.user)

      setPreState(response.data.user.state);
      setPreLga(response.data.user.city);
      setPreAddress(response.data.user.address)
  
     
  
     
  
  
  }).catch(error => {
      console.log(error)
  })
    }





    
  }, [preaddress]);


  React.useEffect(() => {
    

    if(selected){
      let found;
    // let states = $(this).val();
    // console.log(states)
    
    found = mystates.find(e => e.state === selected);
    console.log(found)

    setUserLga(found.lgas);
    }
    
 



  }, [selected]);





  React.useEffect(() => {
    
   







  }, [preaddress]);


  /* User data */
  /* useQuery('user-data', benefitTypesList, {
        onError: (error) => setBenefitTypes([]),
        onSuccess: (data) => setBenefitTypes(data),
    }); */

  const onSubmit = (data) => {
    data = { ...data, dob: `${data.dobDay}-${data.dobMonth}-${data.dobYear}` };
    toggleFormState(true, "updating...");
    userUpdate(data)
      .then(({ user }) => {
        notify(
          "success",
          "Info Update!",
          "Personal information successfully updated!"
        );
        updateUserData(dispatch, user);
      })
      .catch((error) => {
        //console.log("error is " + error)
        errorResponse({ error, dispatch, history });
      })
      .then(() => toggleFormState(false));
  };

  return (
    <>
      <div class="page-title">Personal Information</div>
      <form id="form-user-update" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>First Name</label>
              <input
                type="text"
                class="form-control"
                {...register("firstname", {
                  required: "First name is required!",
                })}
                placeholder="First Name"
              />
              <ErrorMsg errors={errors} name="firstname" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input
                type="text"
                class="form-control"
                {...register("lastname", {
                  required: "Last name is required!",
                })}
                placeholder="Last Name"
              />
              <ErrorMsg errors={errors} name="lastname" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Email Address</label>
              <input
                type="text"
                class="form-control"
                {...register("email", {
                  validate: () => validateEmail(getValues("email")),
                })}
                placeholder="Email Address"
              />
              <ErrorMsg errors={errors} name="email" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                class="form-control"
                {...register("phone", {
                  required: "Phone number is required!",
                })}
                placeholder="Phone Number"
              />
              <ErrorMsg errors={errors} name="phone" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Gender</label>
              <select
                class="form-control"
                {...register("gender", {
                  required: "Gender is required!",
                })}
              >
                <option value="">- Select -</option>
                <option>Female</option>
                <option>Male</option>
              </select>
              <ErrorMsg errors={errors} name="gender" />
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label display-block">Birth Date</label>
            <div class="form-group">
              <div class="row">
                <div class="col-4">
                  <select
                    class="form-control"
                    {...register("dobDay", {
                      required: "Day is required!",
                    })}
                  >
                    <option value="">- Day -</option>
                    <SelectDays />
                  </select>
                </div>

                <div class="col-4">
                  <select
                    class="form-control"
                    {...register("dobMonth", {
                      required: "Month is required!",
                    })}
                  >
                    <option value="">- Month -</option>
                    <SelectMonths />
                  </select>
                </div>

                <div class="col-4">
                  <select
                    class="form-control"
                    {...register("dobYear", {
                      required: "Year is required!",
                    })}
                  >
                    <option value="">- Year -</option>
                    <SelectYears />
                  </select>
                </div>
              </div>
              <ErrorMsg errors={errors} name="dobDay" />
              <ErrorMsg errors={errors} name="dobMonth" />
              <ErrorMsg errors={errors} name="dobYear" />
            </div>
          </div>
        </div>

        <span
          onClick={showModal}
          class="font-weight-bold text-primary font-size-md cursor-pointer"
        >
          Update Password
        </span>

        <hr />

        <span
         
          class="font-weight-bold text-primary font-size-md cursor-pointer"
        >
          Contact Address
        </span>

       {preaddress ? <div>
         <p style={{
           fontSize : "16px",
         }}>Address : {preaddress}, {prelga}, {prestate} <span className="ml-5">      <button  onClick={function(e){
          e.preventDefault()
        }} data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-warning">
          Edit
          </button></span></p>

       </div> :  <div className="py-3 text-center">
          <p>Contact Address not Available </p>

          <button  onClick={function(e){
            e.preventDefault()
          }} data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-secondary">
            Add Address
            </button>
        </div>}


       


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Contact Address</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      <label>State</label>
        <select className="form-control"onChange={function(e){
          e.preventDefault()
         // console.log(e.target.value)


          setSelected(e.target.value)
          console.log(selected);


          
          

       

        
        }}>
          <option value="">Select State</option>

          <option value="Abia">Abia</option>
      						<option value="Adamawa">Adamawa</option>
										<option value="Akwa Ibom">Akwa Ibom</option>
										<option value="Anambra">Anambra</option>
									
										<option value="Rivers">Rivers</option>
										<option value="Bauchi">Bauchi</option>
										<option value="Benue">Benue</option>
								

										<option value="Bornu">Bornu</option>
										<option value="Bayelsa">Bayelsa</option>
										<option value="Cross River">Cross River</option>
										<option value="Delta">Delta</option>
	

										<option value="Ebonyi">Ebonyi</option>
										<option value="Edo">Edo</option>
										<option value="Ekiti">Ekiti</option>
										<option value="Enugu">Enugu</option>


										<option value="Federal Capital Territory">Federal Capital Territory</option>
										<option value="Gombe">Gombe</option>
										<option value="Jigawa">Jigawa</option>
										

										<option value="Imo">Imo</option>
										<option value="Kaduna">Kaduna</option>
										<option value="Kebbi">Kebbi</option>
										<option value="Kano">Kano</option>


										<option value="Kogi">Kogi</option>
											<option value="Ogun">Ogun</option>
										<option value="Ondo">Ondo</option>
										<option value="Osun">Osun</option>
										<option value="Oyo">Oyo</option>
										<option value="Sokoto">Sokoto</option>
										<option value="Plateau">Plateau</option>

										<option value="Taraba">Taraba</option>
										<option value="Yobe">Yobe</option>
										<option value="Zamfara">Zamfara</option>
										<option value="Lagos">Lagos</option>

										<option value="Katsina">Katsina</option>
										<option value="Kwara">Kwara</option>
										<option value="Nasarawa">Nasarawa</option>
										<option value="Niger">Niger</option>

        </select>

        <label>L.G.A</label>
        <select className="form-control"onChange={function(e){
          e.preventDefault()
          //console.log(e.target.value)


          setSelectedlga(e.target.value)
          console.log(selectedlga);


          
          

       

        
        }}>
          <option value="">Select L.G.A</option>

          {lag.map(function(city,i){
            return (
              <option value={city}>{city}</option>
            );
          })}
        </select>

        <hr/>

        <label>Address</label>

        <textarea className="form-control" id="address" onChange={function(e){
          //console.log(e.target.value)

          setAddress(e.target.value);

          let lowerCaseLetters = /[A-Za-z]/g;
          var upperCaseLetters = /[A-Z]/g;
          var alphabets = /^[A-Za-z]+$/i;
          var numbers = /[0-9]/g;

          if (
            // !address.match(lowerCaseLetters) ||
            !address.match(lowerCaseLetters) ||
            !address.match(numbers) 
          
          ) {
            // return NotificationManager.error(
            //   "Invalid password, password must contain,uppercase,lowercase and greater than 8 caracters"
            // );
        
            setValidAddress(false);
          }
        
          else{
            setValidAddress(true);
          }
        }} />
        
        {address && !validaddres ?     <span className="text-danger"style={{
                        fontSize:"11px",
                      }}>Invalid Address format, Address must contain number and alphabets</span>
                    :
                    <span className="text-success"> </span>
                    }
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       
       {validaddres ?  <button type="button" class="btn btn-primary" onClick={handleUpdateClick}>Save changes</button> : <div> </div>

       }
      </div>
    </div>
  </div>
</div>

            <hr />
        <div class="row">
          <div class="col-md-6">
            <button
              type="submit"
              class="btn btn-primary btn-lg btn-block btn-main"
            >
              Update Info
            </button>
          </div>
        </div>
      </form>

      <Modal
        show={modalState}
        onHide={closeModal}
        animation={false}
        keyboard={false}
        className="modal-reset-password"
        backdrop="static"
      >
        <Modal.Body className="p-4">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeModal}
          >
            <i class="fal fa-times"></i>
          </button>

          <h5>CHANGE PASSWORD</h5>
          <hr />

         <form method="POST" onSubmit={onFormSubmit}>

         <div class="form-group">
            <label>Current Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="Current Password"
              onChange={handleCurrentPassword}

              id="passwordInputthree"

              required
            />
          </div>

          <div class="form-group">
            <label>New Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="New Password"
              onChange={handleNewPassword}

              id="passwordInput"

              minLength="8"

              required
            />


              {newpassword ? <div> 
                {!passed ?     <span className="text-danger"style={{
                        fontSize:"11px",
                      }}>Password must contain, uppercase, lowercase, number, special character and greater than 7 caracters</span>
                    :
                    <span className="text-success"style={{
                      fontSize:"11px",
                    }}>Password Validation Checked </span>
                    }
                 </div> : <div></div>}
              
          </div>

          <input type='checkbox' onClick={passwordToggle} /> <span style={{
            fontSize:"12px"
          }}>Show Password</span>

          <div class="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              class="form-control"
              name=""
              placeholder="Confirm New Password"
              onChange={handleConfirmPassword}
              id="passwordInputtwo"

              onKeyUp={handleKeyUp}

              required
            />
            
            {newpassword && confirmpassword && !passwordmatched ? 
          <span style={{
            fontSize:"10px"
          }} className="text-danger font-weight-bold">Password Not Matched</span>
          :
          <div></div>  
          }
          </div>
          

          <hr />

         

          {passwordmatched ? 
          <button class="btn btn-primary btn-block btn-lg mb-3">
          Continue
        </button> :
        <div></div>
        }

         </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
