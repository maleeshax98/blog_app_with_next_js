import React from 'react'

const tags = [
    {
        tag: "Health",
        styles: "bg-green-500",
        textStyles: "text-green-500" 
    },
    {
        tag: "Science",
        styles: "bg-red-500",
        textStyles: "text-red-500" 
    },
    {
        tag: "Technlogoy",
        styles: "bg-blue-500",
        textStyles: "text-blue-500" 
    },
    {
        tag: "Food",
        styles: "bg-yellow-500",
        textStyles: "text-yellow-500" 
    },
    {
        tag: "Any",
        styles: "bg-gray-500",
        textStyles: "text-gray-500" 
    },
]

export default function Tags({ tag, type }) {
    return (
        <div>
            { type && (
                <>
                    { tags.map((t) => (
                        <div key={t.tag}>
                            { t?.tag === tag && (
                                <div className={`catoCard ${t.styles}`}>
                                    { tag }
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
            { !type && (
                <>
                    { tags.map((t) => (
                        <div  key={t.tag}>
                            { t?.tag === tag && (
                                <div className={`cato ${t.textStyles}`} >
                                    { tag }
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
