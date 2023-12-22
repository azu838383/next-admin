import { Modal } from "@mantine/core";
import QRCode from "qrcode.react";

const ModalQR = ({
	visibled,
	setVisible,
	router,
}: {
	visibled: boolean;
	setVisible: (visible: boolean) => void;
	router?: any;
}): JSX.Element => {
	return (
		<Modal
			opened={visibled}
			onClose={() => {
				setVisible(false);
			}}
			title="Scan your 2FA code"
			size={"xs"}
			centered
		>
			<div className="flex justify-center py-4">
				<QRCode
					value={"ioO6ZC1uGPlOqaO7bGMkG7kS"}
					className="bg-white p-2"
					size={120}
					id="qrcode-canvas"
				/>
			</div>
		</Modal>
	);
};

export default ModalQR;
