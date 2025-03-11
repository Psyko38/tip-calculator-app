const BillValue = document.getElementById("Bill");
const TipBTN = document.querySelectorAll(".Tip > div > button");
const PeapoleValue = document.getElementById("Peapole");
const TipText = document.getElementById("Tip");
const TotalText = document.getElementById("Total");
const Form = document.getElementById("myform");
const CustomTip = document.getElementById("Custom");
const ResetBTN = document.getElementById("Reset");
const Errore = document.querySelector(".Error");
const InputPeapole = document.querySelector("label:last-child .Inpute");

let TipValue = 0;
let SelectBTN = 0;
SetupBTN(TipBTN);

function SetupBTN(BTNlist) {
	for (a of BTNlist) {
		const f = a;
		a.addEventListener("click", (e) => {
			if (CustomTip.value == "") {
				if (f.style.backgroundColor === "rgb(38, 194, 174)") {
					SelectBTN = 0;
					TipValue = 0;
					CalculateAndUpdate();
					f.style.backgroundColor = "#00474B";
				} else {
					SelectBTN = 1;
					TipValue = Number(f.innerText.split("%")[0]);
					CalculateAndUpdate();
					f.style.backgroundColor = "#26C2AE";
				}
			}
			for (i of BTNlist) {
				if (i != f) {
					i.style.backgroundColor = "#00474B";
				}
			}
		});
	}
}

Reset.addEventListener("click", () => {
	window.location.reload(false);
});

Form.addEventListener("input", () => {
	if (CustomTip.value !== "") {
		for (f of TipBTN) {
			f.style.backgroundColor = "#00474B";
		}
	}
	CalculateAndUpdate();
});

function CalculateAndUpdate() {
	if (Number(PeapoleValue.value) < 1 && PeapoleValue.value != "") {
		Errore.style.display = "unset";
		InputPeapole.style.outline = "2px solid #E17052";
		return;
	}
	Reset.style.backgroundColor = "#26C2AE";
	InputPeapole.style.outline = "none";
	Errore.style.display = "none";
	if (CustomTip.value != "" || SelectBTN == 0) {
		TipValue = Number(CustomTip.value);
	}
	let Output = CalculatePrice(
		Number(BillValue.value),
		TipValue,
		Number(PeapoleValue.value)
	);

	TipText.innerText = "$" + Output[3].toFixed(2);
	TotalText.innerText = "$" + Output[1].toFixed(2);
}

function CalculatePrice(Bill, Tip, NoP) {
	const returne = [];
	if (Bill < 0 || Tip < 0 || NoP < 0) {
		returne.push(
			Number(TotalText.innerText),
			0,
			Number(TipText.innerText),
			0
		);
		return returne;
	}
	let FinalPrice = 0;
	let FinalTip = 0;
	let UserPrice = 0;
	let UserTip = 0;
	if (Tip > 0) {
		FinalTip = Bill * (Tip / 100);
	}
	FinalPrice = Bill + FinalTip;
	if (NoP > 1) {
		UserPrice = FinalPrice / NoP;
		UserTip = FinalTip / NoP;
	} else {
		UserPrice = FinalPrice;
		UserTip = FinalTip;
	}
	returne.push(
		Number(FinalPrice),
		Number(UserPrice),
		Number(FinalTip),
		Number(UserTip)
	);
	return returne;
}
