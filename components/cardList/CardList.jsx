"use client"
import styles from "./CardList.module.css"
import SingleCard from "../singleCard/SingleCard"
import Menu from "../menu/Menu"
import { useRouter, useSearchParams } from "next/navigation"

export default function CardList({ data, count }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page')) || 1;  


  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        { data && data.map((doc) => (
          <div key={doc.id} className="flex gap-[10px] justify-center md:flex-none w-[100%]">
            <SingleCard 
            key={doc.id}
            id={doc.id}
            title={doc.title}
            cato={doc.cato}
            img={doc.img}
            content={doc.content}
          />
          </div>
        ))}
        <div className='mt-[20px] flex justify-center gap-[40px]'>
          { 15 * (page ) < count &&
              <button className='btn min-w-[150px]' onClick={() => {
                router.push(`/posts?page=${page+1}`)
            }}>Next</button>
          }

          { page != 1 && <button className='btn min-w-[150px]' onClick={() => {
            router.push(`/posts?page=${page-1}`)
        }}>Previous</button> }
          
        </div>
      </div>
      <div className={`${styles.menu} hidden md:flex md:flex-col`}>
        <Menu/>
      </div>
    </div>
  )
}
