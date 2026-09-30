
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const countries = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
];

const Check = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const Arrow = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const Eye = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    {open ? (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.1 3.9" />
        <path d="M6.1 6.1C3.4 8.1 2 12 2 12s3.5 7 10 7c1 0 2-.2 2.9-.5" />
      </>
    )}
  </svg>
);

const Globe = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" />
  </svg>
);

function Field({ label, required = true, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1 text-[10px] font-bold tracking-[0.13em] text-[#526d84] uppercase">
        {label}
        {required && <span className="text-[#4c91c3]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "h-[50px] w-full rounded-[13px] border border-[#b8cad9]/70 bg-white px-4 text-[13px] text-[#08294c] outline-none transition placeholder:text-[#a8b6c2] focus:border-[#3287c4] focus:ring-4 focus:ring-[#3287c4]/10";

export default function Register() {
  const [accountType, setAccountType] = useState("customer");
  const [country, setCountry] = useState("IN");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const selectedCountry = countries.find((item) => item.code === country);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const passwordStrength = useMemo(() => {
    const password = form.password;

    if (!password) {
      return {
        score: 0,
        label: "",
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return { score, label: "Weak" };
    }

    if (score <= 3) {
      return { score, label: "Good" };
    }

    return { score, label: "Strong" };
  }, [form.password]);

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      alert("Please accept the Terms and Privacy Policy.");
      return;
    }

    const payload = {
      accountType,
      country,
      countryName: selectedCountry?.name,
      countryCode: selectedCountry?.dial,
      ...form,
    };

    console.log("Registration payload:", payload);

    setSubmitted(true);

    // Connect your API here.
    // Example:
    //
    // await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-[#08294c]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed -left-[180px] -top-[180px] h-[500px] w-[500px] rounded-full border border-[#80bce4]/20" />

      <div className="pointer-events-none fixed -bottom-[180px] -right-[130px] h-[500px] w-[500px] rounded-full bg-[#dceefb]/70 blur-3xl" />

      {/* NAVIGATION */}
      <header className="relative z-20 border-b border-[#123d6015] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#0756a8] shadow-[0_8px_25px_rgba(7,86,168,.2)]">
              <div className="absolute -right-2 -top-2 h-7 w-7 rounded-full border border-white/30" />
              <div className="absolute -bottom-3 -left-2 h-7 w-7 rounded-full border border-white/30" />

              <span className="relative text-lg font-black italic text-white">
                A
              </span>
            </div>

            <div>
              <div className="text-[19px] font-black tracking-[-0.055em] text-[#06244a]">
                all-blue
                <span className="font-normal text-[#3187c5]">market</span>
              </div>

              <div className="text-[8px] font-semibold tracking-[0.25em] text-[#7890a6] uppercase">
                better food / better living
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-[12px] text-[#71869a]">
            <span className="hidden sm:inline">Already have an account?</span>

            <Link
              to="/login"
              className="rounded-full border border-[#0756a8]/20 bg-[#edf6fd] px-4 py-2 font-bold text-[#0756a8] transition hover:bg-[#0756a8] hover:text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[0.75fr_1.25fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden min-h-[calc(100vh-76px)] overflow-hidden bg-[#062b52] lg:block">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=90"
            alt="Fresh healthy produce"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#031b35] via-[#062b52]/65 to-[#062b52]/20" />

          {/* Rings */}
          <div className="absolute -right-[160px] top-[12%] h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="absolute -right-[95px] top-[19%] h-[365px] w-[365px] rounded-full border border-white/10" />

          <div className="relative flex min-h-[calc(100vh-76px)] flex-col justify-between p-10 xl:p-16">
            <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.22em] text-white/60 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#73c9f1]" />
              Global healthy food marketplace
            </div>

            <div className="max-w-[530px]">
              <div className="mb-5 text-[10px] font-bold tracking-[0.2em] text-[#82c9ef] uppercase">
                Your place in the market
              </div>

              <h1 className="text-[clamp(52px,5vw,82px)] font-black leading-[.86] tracking-[-0.075em] text-white">
                Good food
                <br />
                should have
                <br />
                <span className="text-[#72c8f1]">a home.</span>
              </h1>

              <p className="mt-8 max-w-[450px] text-[15px] leading-7 text-white/60">
                Join a marketplace built around healthier food, independent
                sellers, and people who care about what they eat.
              </p>

              <div className="mt-9 grid max-w-[470px] grid-cols-2 gap-3">
                {[
                  ["01", "Shop healthy food"],
                  ["02", "Meet food makers"],
                  ["03", "Open your shop"],
                  ["04", "Grow your community"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="rounded-[15px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm"
                  >
                    <div className="text-[9px] font-bold tracking-[0.15em] text-[#73c9f1]">
                      {number}
                    </div>

                    <div className="mt-2 text-[11px] font-medium text-white/80">
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[9px] font-medium tracking-[0.15em] text-white/35 uppercase">
              <span>all-blue market</span>
              <span>Made for a global community</span>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
  <div className="w-full max-w-[760px]">

    {/* HEADER */}
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] text-[#4c91c3] uppercase">
        <Globe />
        Join from anywhere
      </div>

      <div className="flex items-end justify-between gap-5">
        <div>
          <h2 className="text-[clamp(36px,4vw,52px)] font-black leading-[.88] tracking-[-0.07em] text-[#06244a]">
            Create your
            <br />
            market account.
          </h2>

          <p className="mt-3 max-w-[480px] text-[12px] leading-5 text-[#71869a]">
            Join as a customer or create your own healthy food shop.
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <div className="text-[9px] font-bold tracking-[0.12em] text-[#8ca0b1] uppercase">
            Step
          </div>
          <div className="text-[20px] font-black text-[#0756a8]">
            01<span className="text-[#b4c2ce]">/01</span>
          </div>
        </div>
      </div>
    </div>

    {/* ACCOUNT TYPE */}
    <div className="mb-5 grid grid-cols-2 gap-2 rounded-[15px] border border-[#b9cad8]/60 bg-white p-1 shadow-[0_8px_25px_rgba(22,63,94,.04)]">

      <button
        type="button"
        onClick={() => setAccountType("customer")}
        className={`rounded-[11px] px-4 py-2.5 text-left transition ${
          accountType === "customer"
            ? "bg-[#0756a8] text-white"
            : "text-[#587087] hover:bg-[#f2f7fb]"
        }`}
      >
        <div className="text-[12px] font-bold">
          Customer
        </div>

        <div
          className={`text-[8px] ${
            accountType === "customer"
              ? "text-white/60"
              : "text-[#91a2b1]"
          }`}
        >
          Discover & buy
        </div>
      </button>

      <button
        type="button"
        onClick={() => setAccountType("seller")}
        className={`rounded-[11px] px-4 py-2.5 text-left transition ${
          accountType === "seller"
            ? "bg-[#0756a8] text-white"
            : "text-[#587087] hover:bg-[#f2f7fb]"
        }`}
      >
        <div className="text-[12px] font-bold">
          Seller
        </div>

        <div
          className={`text-[8px] ${
            accountType === "seller"
              ? "text-white/60"
              : "text-[#91a2b1]"
          }`}
        >
          Create your food shop
        </div>
      </button>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit}>

      {/* ROW 1 */}
      <div className="grid grid-cols-2 gap-3">

        <Field label="First name">
          <input
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            required
            placeholder="First name"
            className={inputClass}
          />
        </Field>

        <Field label="Last name">
          <input
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            required
            placeholder="Last name"
            className={inputClass}
          />
        </Field>

      </div>

      {/* ROW 2 */}
      <div className="mt-3 grid grid-cols-2 gap-3">

        <Field label="Email">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            required
            placeholder="name@example.com"
            className={inputClass}
          />
        </Field>

        <Field label="Phone number">
          <div className="flex h-[50px] overflow-hidden rounded-[13px] border border-[#b8cad9]/70 bg-white transition focus-within:border-[#3287c4] focus-within:ring-4 focus-within:ring-[#3287c4]/10">

            <div className="flex shrink-0 items-center border-r border-[#dce5ec] px-3 text-[11px] font-semibold text-[#587087]">
              {selectedCountry?.dial}
            </div>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={updateField}
              required
              placeholder="Phone number"
              className="min-w-0 flex-1 px-3 text-[12px] text-[#08294c] outline-none placeholder:text-[#a7b5c1]"
            />

          </div>
        </Field>

      </div>

      {/* ROW 3 */}
      <div className="mt-3 grid grid-cols-2 gap-3">

        <Field label="Country">
          <div className="relative">

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`${inputClass} appearance-none pr-9`}
            >
              {countries.map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.flag} {item.name}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7890a3]">
              ↓
            </div>

          </div>
        </Field>

        <Field label="City / Region">
          <input
            name="city"
            value={form.city}
            onChange={updateField}
            required
            placeholder="City / Region"
            className={inputClass}
          />
        </Field>

      </div>

      {/* ROW 4 */}
      <div className="mt-3 grid grid-cols-[1fr_180px] gap-3">

        <Field label="Street address">
          <input
            name="address"
            value={form.address}
            onChange={updateField}
            required
            placeholder="Street address, building or apartment"
            className={inputClass}
          />
        </Field>

        <Field label="Postal / ZIP">
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={updateField}
            required
            placeholder="Postal code"
            className={inputClass}
          />
        </Field>

      </div>

      {/* ROW 5 */}
      <div className="mt-3 grid grid-cols-2 gap-3">

        <Field label="Password">
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={updateField}
              required
              minLength={8}
              placeholder="Create password"
              className={`${inputClass} pr-11`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8195a7]"
            >
              <Eye open={showPassword} />
            </button>

          </div>

          {form.password && (
            <div className="mt-1.5 flex items-center gap-2">

              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      item <= passwordStrength.score
                        ? "bg-[#3187c5]"
                        : "bg-[#dce6ed]"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[8px] font-semibold text-[#71869a]">
                {passwordStrength.label}
              </span>

            </div>
          )}
        </Field>

        <Field label="Confirm password">
          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={updateField}
              required
              placeholder="Repeat password"
              className={`${inputClass} pr-11`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8195a7]"
            >
              <Eye open={showConfirm} />
            </button>

          </div>
        </Field>

      </div>

      {/* SELLER MESSAGE */}
      {accountType === "seller" && (
        <div className="mt-3 rounded-[12px] border border-[#9bcce9]/50 bg-[#eaf6ff] px-4 py-2.5">

          <div className="flex items-center gap-2">

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#1675bd]">
              <Check />
            </span>

            <p className="text-[9px] leading-4 text-[#52738d]">
              After registration, you'll complete your shop profile,
              business details and product information.
            </p>

          </div>

        </div>
      )}

      {/* TERMS + BUTTON */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <label className="flex cursor-pointer items-start gap-2">

          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={updateField}
            required
            className="mt-0.5 h-3.5 w-3.5 accent-[#0756a8]"
          />

          <span className="max-w-[330px] text-[8px] leading-4 text-[#71869a]">
            I agree to the{" "}
            <a
              href="#"
              className="font-semibold text-[#0756a8]"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-semibold text-[#0756a8]"
            >
              Privacy Policy
            </a>
            .
          </span>

        </label>

        <button
          type="submit"
          className="group flex h-[50px] shrink-0 items-center justify-center gap-3 rounded-[13px] bg-[#0756a8] px-7 text-[12px] font-bold text-white shadow-[0_14px_30px_rgba(7,86,168,.2)] transition hover:-translate-y-0.5 hover:bg-[#06498f]"
        >
          Create account

          <span className="transition group-hover:translate-x-1">
            <Arrow />
          </span>
        </button>

      </div>

    </form>

    {/* BOTTOM */}
    <div className="mt-5 flex items-center justify-between border-t border-[#d9e3eb] pt-4">

      <div className="flex items-center gap-2 text-[8px] tracking-[0.08em] text-[#9aabb9] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#5db38a]" />
        Secure registration
      </div>

      <div className="text-[10px] text-[#8194a5]">
        Already a member?{" "}
        <Link
          to="/login"
          className="font-bold text-[#0756a8]"
        >
          Sign in
        </Link>
      </div>

    </div>

  </div>
</section>
      </main>
    </div>
  );
}