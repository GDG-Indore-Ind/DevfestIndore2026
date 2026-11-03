import { FileText, Play } from "lucide-react";
import type { ArchivedEvent } from "@/content/model";
import { ARCHIVE_PAGE as page } from "@/content/pages";
import ExternalLink from "@/components/shared/ExternalLink";
import styles from "./Archive.module.css";

/** Links that leave the site: the official GDG event page and, when there is one, the recording. */
export default function EditionLinks({ event }: { event: ArchivedEvent }) {
  return (
    <p className={styles.links}>
      <ExternalLink href={event.source}>
        <FileText aria-hidden="true" />
        {page.recordLabel}
      </ExternalLink>
      {event.recordingUrl && (
        <ExternalLink href={event.recordingUrl}>
          <Play aria-hidden="true" />
          {page.recordingLabel}
        </ExternalLink>
      )}
    </p>
  );
}
