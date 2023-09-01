import { connect } from 'react-redux'

const Alert = ({ msg }) => {

    return (
        msg !== null && msg.length > 0 && (
            <div className={`${msg[1] ? 'bg-red-400' : 'bg-green-400'} bg-opacity-90 w-40 text-xs md:text-base -mt-20 -mr-20 right-[50%] md:right-[47%] xl:right-[48.5%] top-[68%] md:w-52 p-4 text-center rounded-lg fixed z-20 `} >
                <p className='text-white font-bold' >
                    {msg[0]}
                </p>
            </div>
        )
    )
}

const mapStateToProps = state => ({
    msg: state.user.msg
})

export default connect(mapStateToProps)(Alert)