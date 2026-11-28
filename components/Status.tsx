import styles from "./Status.module.css";

export default function Status({
  status,
}: {
  className?: string;
  status: number;
  size?: string | number;
}) {
  return (
    <div className={styles.status}>
      <span className={styles.statusCode}>{status}</span>
      <span className={styles.statusDesc}>{SUB_TEXTS[status] ?? "Error"}</span>
    </div>
  );
}

const SUB_TEXTS: Partial<Record<number, string>> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};
