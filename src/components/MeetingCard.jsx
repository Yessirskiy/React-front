import {Card} from "antd"

function MeetingCard() {
    return (
        <div>
            <Card
                title={
                    <div className="flex items-center gap-3">
                        <img src="https://11a7e17b-dad9-4516-ba41-8b23b6566f52.selstorage.ru/logo.svg" alt="" />
                        <span>Nikolai</span>
                    </div>
                }
                extra={<a href="#">More</a>}
                style={{
                    width: 300,
                }}
            >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>
        </div>
    )
  }
  
  export default MeetingCard
  