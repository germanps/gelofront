import React, { useState } from "react";
import Layout from "./components/Layout";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import GalleryLogin from "./components/GalleryLogin";
import ninoh from "./assets/logoGirasoles3.png";

export default function App() {
	const [page, setPage] = useState("upload");
	const [galleryKey, setGalleryKey] = useState("");

	const onSetKey = (key) => {
		setGalleryKey(key); // solo se guarda en memoria temporal
		setPage("gallery");
	};

	const showLogo = page !== "gallery"; // ← ocultar logo solo en Gallery

	return (
		<Layout>
			<header className="header">
				<h1>Lorena & Germán</h1>
				<h2 className="subtitle">Comparte tus mejores recuerdos</h2>

				{showLogo && (
					<div className="img-wrapper">
						<img className="img-layout" src={ninoh} />
					</div>
				)}

				<div className="nav">
					<button className="button" onClick={() => setPage("upload")}>
						Subir
					</button>
					<button
						className="button"
						onClick={() => {
							setGalleryKey(""); // borra la clave cada vez
							setPage("gallery");
						}}
					>
						Galería
					</button>
				</div>
			</header>

			{page === "upload" && <Upload />}
			{page === "gallery" &&
				(galleryKey ? (
					<Gallery galleryKey={galleryKey} />
				) : (
					<GalleryLogin onSetKey={onSetKey} />
				))}
		</Layout>
	);
}
