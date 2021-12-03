import React from "react";


/**
 * Image 列表页面
 */
class ImageList extends React.Component {


    render() {
        let numbers = [1, 2, 3]
        const liList = numbers.map((number) => {
           return <li key={number.toString()}>{number}</li>
        });
        console.log(liList)

        return (
            <div>
                <ul>
                    {liList}
                </ul>
            </div>
        );
    }
}

export default ImageList;