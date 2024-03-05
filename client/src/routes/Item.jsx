import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getItem, getListingImages } from "../api/items";

const Item = () => {
	let { id } = useParams();
	//return <div>{id}</div>
	const [item, setItem] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [item_images, setImages] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getItem(id)
			.then((data) => {
				setItem(data);

				getListingImages(id)
					.then((data) => {
						setImages(data);
					})
					.catch((error) => {
						setError(error);
					});
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div class="container text-center">Loading...</div>;
	}

	if (error) {
		return (
			<div className="container mt-4">
				<div class="alert alert-danger">Error: {error.message}</div>
			</div>
		);
	}

	// lil bit hacky
	const isAuction = item.opening_bid != null;

	console.log(item_images);

	return (
		<div>
			<Navbar />
			<div className="container mt-4">
				<div className="card">
					<div className="row g-0">
						<div className="col">
							{/* carousel of images, all container inside the listing_image table */}
							<Carousel>
								{[{ image_path: item.image_path }, ...item_images].map(
									(image, index) => (
										<Carousel.Item key={index}>
											<img
												className="d-block w-100 img-fluid rounded-start"
												src={image.image_path}
												alt="Item"
											/>
										</Carousel.Item>
									)
								)}
							</Carousel>
						</div>

						{/* card which contains buttons, info, etc */}
						<div className="col col-5">
							<div class="card-body">
								<h5 className="card-title">{item.name}</h5>
								<p className="card-text">£{item.price}</p>
								<p class="card-text">
									<small class="text-muted">
										{new Date(item.created_at).toLocaleDateString("en-us", {
											weekday: "long",
											year: "numeric",
											month: "short",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
									</small>
								</p>
								<p className="card-text">{item.description}</p>
								{isAuction && (
									<div class="input-group">
										<span class="input-group-text">£</span>
										<input type="text" class="form-control" placeholder="Bid" />
										<Link to="#" class="btn btn-primary">
											Submit Bid
										</Link>
										<Link to="#" class="btn btn-danger">
											Report Listing
										</Link>
									</div>
								)}
								{!isAuction && (
									<div class="input-group">
										<Link to="#" class="btn btn-primary">
											Message Seller
										</Link>
										<Link to="#" class="btn btn-danger">
											Report Listing
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
