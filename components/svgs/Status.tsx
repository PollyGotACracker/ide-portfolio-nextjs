import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export default function Status({ className, status, size = "800px" }: { className?: string; status: number; size?: string | number; }) {
  return (
    <div className={jetBrainsMono.variable}>
      <svg className={className ?? ""} fill="currentColor" style={{ width: size, height: size }} viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="_x30_8_x2C__Browser_x2C__page_x2C__website_x2C__web_x2C__404">
          <g id="XMLID_858_">
            <g id="XMLID_185_">
              <path d="M456,151H56c-2.761,0-5-2.239-5-5s2.239-5,5-5h400c2.762,0,5,2.239,5,5S458.762,151,456,151z" id="XMLID_680_" />
            </g>
            <g id="XMLID_184_">
              <path d="M426.499,446H85.501C66.477,446,51,430.523,51,411.499V101c0-19.024,15.477-34.501,34.501-34.501H426.5     c19.023,0,34.5,15.477,34.5,34.5v310.5C461,430.523,445.522,446,426.499,446z M85.501,76.499C71.991,76.499,61,87.49,61,101     v310.499C61,425.009,71.991,436,85.501,436h340.998c13.51,0,24.501-10.991,24.501-24.501v-310.5c0-13.509-10.99-24.5-24.5-24.5     H85.501z" id="XMLID_677_" />
            </g>
            <g id="XMLID_183_">
              <path d="M411,131c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S422.028,131,411,131z M411,101     c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S416.514,101,411,101z" id="XMLID_673_" />
            </g>
            <g id="XMLID_182_">
              <path d="M361,131c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S372.028,131,361,131z M361,101     c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S366.514,101,361,101z" id="XMLID_670_" />
            </g>
            <g id="XMLID_181_">
              <path d="M311,131c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S322.028,131,311,131z M311,101     c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S316.514,101,311,101z" id="XMLID_667_" />
            </g>
            <g id="XMLID_180_">
              <path d="M141,151c-2.761,0-5-2.239-5-5V71c0-2.761,2.239-5,5-5s5,2.239,5,5v75C146,148.761,143.761,151,141,151z     " id="XMLID_666_" />
            </g>
            <g id="XMLID_179_">
              <path d="M406,446H106c-2.761,0-5-2.238-5-5V196c0-2.761,2.239-5,5-5h300c2.762,0,5,2.239,5,5v245     C411,443.762,408.762,446,406,446z M111,436h290V201H111V436z" id="XMLID_663_" />
            </g>
            <text style={{ fontFamily: "var(--font-jetbrains-mono)" }} x="256" y="330" textAnchor="middle" fontSize="100" fill="currentColor">{status}</text>
          </g>
        </g>
        <g id="Layer_1" />
      </svg>
    </div>
  );
}