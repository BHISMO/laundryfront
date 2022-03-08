import { v4 as uuidv4 } from 'uuid';
import Magzpion from '../images/projectImg.png';

const projects = [
  {
    id: uuidv4(),
    name: 'Magzpion',
    desc:
      'Aplikasi untuk lomba Majalah digital maspion yang diadakan pada Desember 2020',
    img: Magzpion,
    link: 'https://github.com/ajinata84/Maspion_Madig',
  },
];

export default projects;
