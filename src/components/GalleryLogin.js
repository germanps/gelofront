import React, { useState } from "react";

export default function GalleryLogin({ onSetKey }) {
	const [key, setKey] = useState("");

	const submit = () => {
		if (!key) return alert("Introduce la clave");
		onSetKey(key);
	};

	return (
		<div className="login-card">
			<h3>Introduce la clave para ver la galería</h3>
			<input
				id="loginInput"
				name="login-input"
				className="input"
				value={key}
				onChange={(e) => setKey(e.target.value)}
				placeholder="Clave de la galería"
			/>
			<div style={{ marginTop: 12 }}>
				<button className="button" onClick={submit}>
					Entrar
				</button>
			</div>
			<p style={{ marginTop: 10, color: "#000" }}>
				La clave la hemos facilitado a los invitados. Sólo quienes la tengan
				podrán ver las fotos.
			</p>
		</div>
	);
}
