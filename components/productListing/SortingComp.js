import React from "react";
import classes from "./product.module.css";
import { priceOption } from "~/pages/product";




const SortingComp = ({
    sorting,
    data,
    selectedCate,
    setSelectedCate,
    selectedPrice,
    setSelectedPrice,
    selectedBrand,
    setSelectedBrand,
    selectedDate,
    setSelectedDate
}) => {
    // const [selectedCate, setSelectedCate] = useState("")
    // const categoryHandler = async (cate) => {
    //     console.log({ cate });
    //     setSelectedCate(cate)
    // }
    console.log("selected---->>.", { selectedCate, selectedBrand, selectedPrice });


    return (
        <>
            <div className={`container-fluid pt-2 ${classes.sectionWrapper}`}>
                <div className='custom_container'>
                    {
                        sorting ?
                            <div className="row mb-4">
                                <div className="col-sm">
                                    <div className="row">
                                        <div className="col-4 col-sm-auto">
                                            <div className={classes.inpBox}>
                                                <select
                                                    id="dateAdded"
                                                    onChange={(e) => setSelectedCate(e.target.value)}
                                                    className={classes.inpSelect}
                                                    value={selectedCate}
                                                >
                                                    <option value="">Category</option>
                                                    {
                                                        data && data.category ? data.category?.map((item) => (
                                                            <option value={item?.name} key={item?._id}>{item?.name}</option>
                                                        )) : (
                                                            <></>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-4 col-sm-auto">
                                            <div className={classes.inpBox}>
                                                <select
                                                    id="dateAdded"
                                                    className={classes.inpSelect}
                                                    onChange={(e) => setSelectedPrice(e.target.value)}
                                                    value={selectedPrice}

                                                >
                                                    <option value="">Price</option>
                                                    {
                                                        priceOption.map(item => (
                                                            <option key={item.id} value={item.symbol}>{item.sortBy}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            data?.brand.length ? (
                                                <div className="col-4 col-sm-auto">
                                                    <div className={classes.inpBox}>
                                                        <select
                                                            id="dateAdded"
                                                            className={classes.inpSelect}
                                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                                            value={selectedBrand}
                                                        >
                                                            <option value="">Brand</option>
                                                            {
                                                                data?.brand?.map((item) => (
                                                                    <option value={item?.name} key={item?._id}>{item?.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="col-4 col-sm-auto mt-2 mt-sm-0">
                                    <div>
                                    {/* <label htmlFor="dateAdded" className={`d-none d-sm-block ${classes.inpLabel}`}> Sorting by:</label>  */}
                                        {/* <input type="date" className={classes.inpSelect} /> 
                                        <select id="dateAdded" className={classes.inpSelect}>
                                            <option value="1">Date added</option>
                                            <option value="1">12/01/2024</option>
                                            <option value="1">12/01/2024</option>
                                            <option value="1">12/01/2024</option>
                                        </select>
                                        */}
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                </div>
            </div>
        </>
    );
};

export default SortingComp;
