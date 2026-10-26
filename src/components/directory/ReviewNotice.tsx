import { DIRECTORY_REVIEW } from "@/lib/directoryAccess";
import { DIRECTORY_COPY } from "@/content/directory";
import styles from "./Directory.module.css";
export default function ReviewNotice({ approved = false }: { approved?: boolean }) {
  return DIRECTORY_REVIEW ? (
    <p className={styles.review}>
      {approved ? DIRECTORY_COPY.profile.approvedReviewNotice : DIRECTORY_COPY.profile.reviewNotice}
    </p>
  ) : null;
}
