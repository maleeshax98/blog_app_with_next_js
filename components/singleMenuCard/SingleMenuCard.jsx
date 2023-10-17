import Image from "next/image"
import styles from "./singleMenuCard.module.css"
import Tags from "../tags/Tags"

export default function SingleMenuCard({ title, content, img, cato, key}) {
  return (
    <div key={key}>
        <div className={`${styles.container} md:flex mt-[20px]`}>
            <div className={styles.imageContainer}>
                <Image src={img} fill className="object-cover rounded-full" alt="" />
            </div>
            <div className={styles.textContainer}>
                <div className="cato float-left">
                    <Tags tag={cato} key={cato} />
                </div>
                <h1 className="font-bold text-md clear-both text-gray-800">{title}</h1>
                <p className="text-gray-400 font-light text-sm">{content.replace(/<[^>]*>/g, '').slice(0, 50)}...</p>

            </div>
        </div>
    </div>
  )
}
