import React from 'react';
import Link from 'next/link';
import styles from "../styles/error.module.css"
function Error({ statusCode }) {
    return (
      <p className={styles.errormain}>
        {statusCode
          ? (<>
            <div className={styles.errortext}>An error {statusCode} occurred on server</div>
                <Link href="/">
                <a className={styles.errorachor}>Click here to Homepage</a>
                </Link></>)
          : 'An error occurred on client'}
      </p>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error