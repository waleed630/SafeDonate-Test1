interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const MOCK_METHODS: PaymentMethod[] = [
  { id: 'pm1', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2026, isDefault: true },
  { id: 'pm2', brand: 'Mastercard', last4: '5555', expMonth: 6, expYear: 2025, isDefault: false },
];

export function PaymentMethodsSection() {
  const methods = MOCK_METHODS;

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-4">Payment methods</h3>
      <p className="text-slate-500 text-sm mb-4">
        Manage your saved cards for faster checkout. Payments are secured via Stripe.
      </p>
      <div className="space-y-3 mb-4">
        {methods.map((pm) => (
          <div
            key={pm.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {pm.brand.slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  {pm.brand} •••• {pm.last4}
                </p>
                <p className="text-xs text-slate-500">
                  Expires {String(pm.expMonth).padStart(2, '0')}/{pm.expYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pm.isDefault && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                  Default
                </span>
              )}
              {!pm.isDefault && (
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Set default
                </button>
              )}
              <button type="button" className="text-sm text-slate-500 hover:text-rose-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
      >
        + Add payment method
      </button>
      <p className="text-xs text-slate-400 mt-3">
        You can also manage payment methods and billing in the secure Stripe Customer Portal when making a donation.
      </p>
    </div>
  );
}
