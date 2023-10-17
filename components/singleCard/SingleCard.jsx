import Image from "next/image"
import styles from "./singleCard.module.css"
import Tags from "../tags/Tags"
import Link from "next/link"

export default function SingleCard({ title, cato, img, content, id }) {
  return (
        <div className={`${styles.container} md:flex mt-[20px] bg-white shadow-md p-[10px]  md:max-w-[100%] w-[100%] md:w-[650px] rounded-lg`} key={id}>
            <div className={`${styles.imageContainer} max-w-[100%] md:max-w-[250px]`}>
                <Image src={img} fill className="object-cover rounded-xl" alt="" sizes="" />
            </div>
            <div className={styles.textContainer}>
                <div className="cato float-left">
                    <Tags tag={cato} />
                </div>
                <h1 className="font-bold text-xl clear-both text-gray-800">{title}</h1>
                <p className="text-gray-400 font-light text-sm">{content.replace(/<[^>]*>/g, '').slice(0, 80)}...</p>
                <Link href={`/posts/${id}`} >
                    <button className="btn mt-[10px] font-medium text-sm">Read More</button>
                </Link>
            </div>
        </div>
  )
}
