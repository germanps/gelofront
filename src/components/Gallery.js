import React, { useEffect, useState } from "react";

export default function Gallery({ galleryKey }) {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedPhoto, setSelectedPhoto] = useState(null);

	// PAGINACIÓN
	const [currentPage, setCurrentPage] = useState(1);
	const photosPerPage = 4; // máximo de fotos por página

	useEffect(() => {
		const fetchList = async () => {
			try {
				const url = process.env.REACT_APP_API_URL
					? process.env.REACT_APP_API_URL + "/api/upload/list"
					: "http://localhost:4000/api/upload/list";

				const res = await fetch(url, {
					headers: {
						"x-gallery-key": galleryKey,
					},
				});

				const data = await res.json();
				if (data.ok) setPhotos(data.urls || []);
				else setError(data.error || "No autorizado");
			} catch (e) {
				console.error(e);
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchList();
	}, [galleryKey]);

	const downloadImage = async (url) => {
		try {
			const response = await fetch(url, { mode: "cors" });
			const blob = await response.blob();

			const blobUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");

			link.href = blobUrl;
			link.download = `foto-boda-${Date.now()}.jpg`;
			document.body.appendChild(link);
			link.click();

			link.remove();
			window.URL.revokeObjectURL(blobUrl);
		} catch (err) {
			console.error("Error descargando imagen", err);
			alert("Mantén pulsada la imagen para guardarla 📷");
		}
	};

	// CALCULAR FOTOS DE LA PÁGINA ACTUAL
	const indexOfLastPhoto = currentPage * photosPerPage;
	const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
	const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

	const totalPages = Math.ceil(photos.length / photosPerPage);

	if (loading)
		return (
			<p style={{ textAlign: "center", marginTop: 30 }}>Cargando galería...</p>
		);

	if (error)
		return (
			<p style={{ textAlign: "center", marginTop: 30, color: "red" }}>
				Error: {error}
			</p>
		);

	return (
		<div>
			<h3 style={{ textAlign: "center", fontWeight: "bold" }}>
				Galería de la boda ✨
			</h3>

			<div className="gallery">
				{currentPhotos.map((u, i) => (
					<img
						key={indexOfFirstPhoto + i}
						src={u}
						alt={`foto-${indexOfFirstPhoto + i}`}
						onClick={() => setSelectedPhoto(u)}
					/>
				))}
			</div>

			{/* PAGINADOR */}
			{totalPages > 1 && (
				<div className="pagination">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						◀ Anterior
					</button>

					<span className="page-indicator">
						Página {currentPage} / {totalPages}
					</span>

					<button
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
					>
						Siguiente ▶
					</button>
				</div>
			)}

			{/* MODAL */}
			{selectedPhoto && (
				<div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<img src={selectedPhoto} alt="Foto ampliada" />

						<div className="modal-bar">
							<button
								className="modal-btn primary"
								onClick={() => downloadImage(selectedPhoto)}
							>
								⬇ Guardar
							</button>

							<button
								className="modal-btn"
								onClick={() => setSelectedPhoto(null)}
							>
								✕ Cerrar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
