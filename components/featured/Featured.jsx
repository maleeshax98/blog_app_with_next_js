import Image from "next/image"
import styles from "./Featured.module.css"
import Tags from "../tags/Tags";
import Link from "next/link";

export default async function Featured({ featured }) {
    return (
        <div className="mt-[50px]">
            { featured && (
                <div className={`${styles.container} flex-cols justify-center md:flex `}>
                    <div className={styles.imageContainer}>
                        <Image src={featured.img} fill className="object-cover rounded-xl" alt=""  />
                    </div>
                    <div className={styles.textContainer}>
                        <div className="cato font-medium float-left">
                            <Tags tag={featured.cato} />
                        </div>
                        <h1 className="font-bold text-4xl clear-both text-gray-800 mb-[10px]">{featured.title}</h1>
                        <p className="text-gray-400 ">{featured.content.replace(/<[^>]*>/g, '').slice(0, 100)}...</p>
                        <Link href={`/posts/${featured.id}`} >
                            <button className="btn mt-[10px]">Read More</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
