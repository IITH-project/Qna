import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import { FaComment } from 'react-icons/fa';

export default function Posts() {
  return (
    <div className={styles.postMain}>
      <Accordion allowToggle>
  <AccordionItem>
    <h2>

        <Box as="span" flex='1' textAlign='left'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti sed illum, libero ab voluptates harum soluta placeat eius amet expedita aperiam dolore! Maiores animi officiis vel perspiciatis sit magni quibusdam aspernatur ut excepturi, esse ipsa aperiam repellat eaque eveniet velit commodi ullam est! Atque quia assumenda labore! Provident dicta nostrum ducimus fugit quo quod saepe. Odio, amet nisi. Consequatur beatae, quod earum voluptatem vel debitis error maiores cumque nam pariatur deserunt, accusamus esse quibusdam cupiditate mollitia recusandae provident sint eum ab inventore. Maiores neque consectetur earum reprehenderit blanditiis, libero incidunt ut consequatur sequi dolore eos. Non impedit quam autem quasi. Nemo non odit consectetur eligendi eum, eius quisquam amet possimus quos velit, praesentium dignissimos earum laborum, repudiandae nisi soluta veritatis quae veniam pariatur ipsa. Sequi doloremque, corporis maiores praesentium perferendis molestias odit atque eligendi nam harum pariatur, assumenda inventore laboriosam totam nobis earum dolor ducimus ex ratione deserunt necessitatibus natus soluta. Ipsam adipisci cum sapiente ipsum at architecto, voluptatibus, debitis repellendus nostrum quod delectus voluptate optio inventore eveniet cupiditate? Facilis excepturi ducimus aliquam necessitatibus fugit cum atque reprehenderit, pariatur sequi commodi rem tenetur dolorum eos tempore minus, debitis dicta doloribus voluptatibus. Labore repellat nisi rem quae magni fugit? Consequuntur nostrum quo magni, deserunt excepturi suscipit accusamus dolorum similique animi asperiores praesentium ipsam aut assumenda nesciunt. Ut assumenda dolorem a repellat quas, adipisci placeat, dolorum itaque consectetur ratione exercitationem quia accusantium sint blanditiis ab quis delectus minus id dolores? Quod earum suscipit cupiditate voluptatibus ad veniam nisi aperiam commodi expedita cumque veritatis fuga, reprehenderit officiis aut rem omnis sit animi aliquid rerum officia? Quisquam repudiandae iste doloremque nemo dolorem fugit, minima accusantium, deleniti quod officiis excepturi iure, adipisci error mollitia qui aliquid repellat odit dolore voluptate itaque incidunt eos! Placeat dignissimos ipsam laboriosam officiis maiores repellat commodi, magnam beatae doloribus.
        </Box>
 
    </h2>
        <AccordionButton position={'fixed'} paddingLeft='0px'><AccordionIcon/><FaComment/></AccordionButton>
    <AccordionPanel pb={4} paddingLeft='41px'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea nam, architecto dignissimos, sapiente ex unde suscipit deserunt laboriosam voluptatibus, debitis nemo ipsum voluptates? Voluptatem in aperiam quasi esse tempora quas et ipsam odio quos iste molestiae culpa rem omnis excepturi magnam debitis natus minus, quaerat aspernatur, est accusamus quae. Ducimus, cumque, corrupti illum debitis at autem cupiditate minima repellendus magnam ratione doloremque delectus dolores pariatur error qui nesciunt! Quia harum, earum aut eius magni repudiandae dolore? Illo non quidem provident dolorum accusamus voluptates, perspiciatis dicta minus fugit hic illum ex nam pariatur veniam rem sit esse ratione perferendis aliquam magni quisquam sint expedita culpa. Sint veniam fugit laboriosam perferendis quas fuga ipsum et quaerat alias ab asperiores enim, culpa laborum perspiciatis? Natus aperiam molestias aliquam earum quam, repellat modi itaque debitis, quasi noollitia praesentium ad nihil temporibus perspiciatis, ea sunt facilis expedita non officia enim odit quaerat, dicta ratione sed incidunt velit quo iste, rerum unde aspernatur dolores ipsa?
    </AccordionPanel>
  </AccordionItem>
</Accordion>

    </div>
  )
}
