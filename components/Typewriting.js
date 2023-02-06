import React from 'react';

//importing typewriter-effect
import Typewriter from "typewriter-effect";
import styles from '@/styles/Home.module.css'

function Typing() {
return (
	<div className={styles.App}>
	<Typewriter
  	options={{
	autoStart: true,
    loop: true,
	deleteSpeed:30,

    strings: [
		'Suraj kumar',
		 'Shivanshu',
		 'Karthik'
		],
  }}
/>
	</div>
);
}

export default Typing;
