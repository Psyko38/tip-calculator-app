const BillValue = document.getElementById("Bill");
const TipBTN = document.querySelectorAll(".Tip > div > button");
const PeapoleValue = document.getElementById("Peapole");
const TipText = document.getElementById("Tip");
const TotalText = document.getElementById("Total");
const Form = document.getElementById("myform");
const CustomTip = document.getElementById("Custom");

let TipValue = 0;
SetupBTN(TipBTN);

function SetupBTN(BTNlist) {
	for (a of BTNlist) {
		const f = a;
		a.addEventListener("click", (e) => {
			for (i of BTNlist) {
				i.style.backgroundColor = "#00474B";
			}

			if (CustomTip.value == "") {
				TipValue = Number(f.innerText.split("%")[0]);
				CalculateAndUpdate();
				f.style.backgroundColor = "#26C2AE";
			}
		});
	}
}

Form.addEventListener("input", () => {
	CalculateAndUpdate();
});

function CalculateAndUpdate() {
	if (CustomTip.value != "") {
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
