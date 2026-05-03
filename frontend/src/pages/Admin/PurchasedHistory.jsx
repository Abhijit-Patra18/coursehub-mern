
import "./css/PurchasedHistory.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FlashContext } from "../../context/FlashContext";
import PageTitle from "../../components/PageTitle";
import api from "../../api/axios";

function PurchasedHistory() {

    const [allPurchase, setAllPurchase] = useState();
    const { showFlash } = useContext(FlashContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/purchase/all");
                setAllPurchase(res.data);
            } catch (err) {
                showFlash(err.response?.data?.message || "Error", "error");
            }
        }
        fetchData();
    }, [])


    return (
        <>
            <div className="purchase-title">
                <PageTitle title= "All Purchase History" />
            </div>

            <div className="purchase">

                {!allPurchase && <p>Don't have any purchase history</p>}

                <div className="purchase-items">
                    {allPurchase && allPurchase.map((purchase) =>

                        <div className="purchase-item" key={purchase._id}>
                            <span className="purchase-user">{purchase.user.email}</span>
                            <span className="purchase-course">{purchase.course.title}</span>
                            <span className="purchase-date">
                                {
                                    new Date(purchase.purchaseDate).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })
                                }
                            </span>
                        </div>

                    )};
                </div>
            </div>
        </>
    )
}

export default PurchasedHistory;