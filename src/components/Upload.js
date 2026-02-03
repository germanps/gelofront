import React, { useState } from "react";

export default function Upload() {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleFilesChange = (e) => {
		setFiles(Array.from(e.target.files));
	};

	const handleUpload = async () => {
		if (!files.length) {
			alert("Selecciona al menos una foto");
			return;
		}

		setLoading(true);
		const formData = new FormData();
		files.forEach((file) => formData.append("photos", file));

		try {
			const res = await fetch(
				process.env.REACT_APP_API_URL
					? process.env.REACT_APP_API_URL + "/api/upload"
					: "http://localhost:4000/api/upload",
				{
					method: "POST",
					body: formData,
				},
			);

			const data = await res.json();
			if (data.ok) {
				alert("Fotos subidas correctamente ❤️");
				setFiles([]); // limpiar preview
			} else {
				alert("Error al subir fotos");
			}
		} catch (err) {
			alert("Error de conexión");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="upload-card">
			<p style={{ marginTop: 0, color: 'black', fontWeight: 'bold' }}>
				Puedes seleccionar varias fotos. Se mostrarán antes de subir.
			</p>
			<label className="file-upload">
				Selecciona tus fotos 🌿❤️
				<input type="file" multiple onChange={handleFilesChange} />
			</label>

			{/* PREVIEW */}
			{files.length > 0 && (
				<div style={previewContainer}>
					{files.map((file, index) => (
						<div key={index} style={previewItem}>
							<img
								src={URL.createObjectURL(file)}
								alt="preview"
								style={previewImage}
							/>
						</div>
					))}
				</div>
			)}

			<button
				className="button upload"
				onClick={handleUpload}
				disabled={loading}
				style={{ marginTop: "15px" }}
			>
				{loading ? "Subiendo..." : "Subir Fotos"}
			</button>
		</div>
	);
}

const previewContainer = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
	gap: "10px",
	marginTop: "15px",
};

const previewItem = {
	borderRadius: "8px",
	overflow: "hidden",
	boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const previewImage = {
	width: "100%",
	height: "90px",
	objectFit: "cover",
};
